const fs = require('fs');
const path = require('path');

const citiesData = [
    {
        name: "Ahmedabad",
        slug: "ahmedabad",
        state: "gj",
        description: "A historic city on the banks of the Sabarmati River, Ahmedabad blends ancient heritage with spiritual modernism, hosting landmarks like the Akshardham and Bhadrakali temples.",
        x: "75.0",
        y: "345.0",
        tagline: "The Historic Gateway of Sabarmati and Devotion",
        seo_title: "Ahmedabad | Sabarmati River, Historic Temples & Sacred Heritage",
        seo_description: "Discover the spiritual side of Ahmedabad. Explore the historic Akshardham Temple, Bhadra Kali Temple, and the serene banks of Sabarmati.",
        seo_keywords: "Ahmedabad, Sabarmati, Akshardham Temple, Bhadrakali Temple, Gujarat, Hindu Pilgrimage, Swaminarayan",
        highlights: [
            { name: "Bhadrakali Temple", description: "An ancient temple dedicated to Goddess Bhadrakali, the patron deity of the city." },
            { name: "Akshardham Temple (Gandhinagar)", description: "A magnificent complex showcasing traditional stone carving and Vedic culture." },
            { name: "Hutheesing Jain Temple", description: "A remarkably elegant 19th-century temple known for its delicate carving." }
        ],
        keyRituals: [
            { name: "Bhadrakali Garba & Aarti", description: "Special prayers and traditional Garba dance performed during Navratri." },
            { name: "Sabarmati River Aarti", description: "Evening prayers offered to the river deity on the banks of the Sabarmati Riverfront." }
        ],
        travelInfo: {
            bestTime: "October to March.",
            howToReach: "Well connected by Sardar Vallabhbhai Patel International Airport and Ahmedabad Junction Railway Station.",
            nearestAirport: "Sardar Vallabhbhai Patel International Airport (AMD).",
            nearestRailway: "Ahmedabad Junction Railway Station (ADI)."
        },
        faqs: [
            { question: "Is the Akshardham temple located inside Ahmedabad?", answer: "Akshardham is located in Gandhinagar, which is about 25 km from Ahmedabad city center and takes around 45 minutes to reach." },
            { question: "When is the Bhadrakali temple busiest?", answer: "During Navratri and on Tuesdays/Fridays, many devotees visit the temple for special blessings." }
        ],
        tips: [
            "Visit the Riverfront in the evening for a serene atmosphere.",
            "Hire a local guide to understand the historic architecture of the old city."
        ],
        spiritualEssence: "Ahmedabad represents the integration of commerce and spiritual devotion (Dharma). The presence of the ancient Bhadrakali temple at the city's heart acts as a protective shield, while modern spiritual centers like Akshardham inspire deep devotion and self-realization.",
        longDescription: "Ahmedabad, founded by Sultan Ahmed Shah in 1411, is a UNESCO World Heritage City. Beyond its commercial success, it is a city of deep-rooted spirituality. The Bhadrakali temple, dating back to the founding of the city, has been a beacon of faith for centuries. The Swaminarayan sect has a major presence here, with beautiful carved wooden temples in the old city. The Sabarmati Riverfront, modern yet spiritual, plays host to evening aartis, creating a bridge between ancient traditions and modern lifestyle.",
        ancientLore: "It is said that when Sultan Ahmed Shah was on the banks of the Sabarmati, he saw a hare chasing a dog. Astounded by this act of bravery, he decided to build his capital here, declaring it a land of unique strength. Devotees believe that Goddess Bhadrakali personally blesses the commerce of the city, bringing prosperity to all who worship her.",
        deepInsights: "Ahmedabad teaches us that material growth and spiritual values can coexist. The peaceful coexistence of old heritage pols and modern architectural wonders reflects a balanced mind that honors both the past and the future."
    },
    {
        name: "Bangalore",
        slug: "bangalore",
        state: "ka",
        description: "Known as the Garden City, Bangalore is home to historic spiritual landmarks like the Bull Temple, the majestic ISKCON Temple, and the ancient Someshwara Temple.",
        x: "185.0",
        y: "515.0",
        tagline: "The Confluence of Technology and Ancient Devotion",
        seo_title: "Bangalore | ISKCON Temple, Bull Temple & Ancient Sacred Shrines",
        seo_description: "Explore the divine landmarks of Bangalore. From the colossal monolith of the Bull Temple to the grand ISKCON temple and historic Chola shrines.",
        seo_keywords: "Bangalore, Bengaluru, ISKCON Bangalore, Bull Temple, Someshwara Temple, Karnataka, Hindu Temples",
        highlights: [
            { name: "Bull Temple (Dodda Basavana Gudi)", description: "A 16th-century temple housing a colossal monolithic Nandi statue." },
            { name: "ISKCON Sri Radha Krishna Temple", description: "One of the largest ISKCON temples in the world, combining modern and traditional Dravidian styles." },
            { name: "Halasuru Someshwara Temple", description: "One of the oldest temples in the city, dating back to the Chola Empire." }
        ],
        keyRituals: [
            { name: "Kadalekai Parishe", description: "The annual groundnut festival celebrated at the Bull Temple with grand offerings." },
            { name: "Kalyanotsava", description: "The divine marriage ritual of the deities performed daily at the ISKCON Temple." }
        ],
        travelInfo: {
            bestTime: "September to March.",
            howToReach: "Well connected by Kempegowda International Airport and Bangalore City Railway Station.",
            nearestAirport: "Kempegowda International Airport (BLR).",
            nearestRailway: "Krantivira Sangolli Rayanna Railway Station (SBC)."
        },
        faqs: [
            { question: "What is the history of the Bull Temple?", answer: "The Bull Temple was built in 1537 by Kempe Gowda, the founder of Bangalore. The Nandi statue is carved out of a single granite rock." },
            { question: "Are there entry fees at ISKCON Bangalore?", answer: "No, entry is free for all visitors. Special darshan tickets can be purchased optionally." }
        ],
        tips: [
            "Visit the Bull Temple during Kadalekai Parishe (Groundnut Fair) to experience local folklore.",
            "Photography is generally restricted inside the sanctums of major temples."
        ],
        spiritualEssence: "Bangalore exhibits a high vibration of corporate responsibility aligned with spiritual wisdom. The city represents the intellect (Buddhi) seeking stability, grounded by the enormous weight and focus of the monolithic Nandi at Basavanagudi.",
        longDescription: "While Bangalore is celebrated as India's silicon valley, its spiritual roots run deep. The Chola dynasty left behind architectural marvels like the Halasuru Someshwara Temple. Later rulers like Kempe Gowda built fortresses and temples to protect the city's culture. In the modern era, Bangalore has embraced grand spiritual landmarks like the ISKCON Temple and the Art of Living Ashram, showing a continuous evolution of human consciousness seeking both material innovation and spiritual peace.",
        ancientLore: "Legend has it that a wild bull used to ruin groundnut crops in the area of Basavanagudi. A farmer hit the bull with a club, and the bull sat down, turned to stone, and began to grow. The farmers prayed to Lord Shiva, who advised placing a trident on the bull's head to stop its growth. The stone bull stopped growing, and the Bull Temple was built to honor it.",
        deepInsights: "Bangalore teaches that dynamic action (Karma) must be anchored in steady contemplation (Dhyana). The balance of high-paced IT life with evening visits to ancient temples represents the perfect integration of the outer world and the inner self."
    },
    {
        name: "Bhopal",
        slug: "bhopal",
        state: "mp",
        description: "Bhopal, the City of Lakes, features the grand Bhojeshwar Temple, housing one of the largest monolithic Shiva lingams in the world.",
        x: "215.0",
        y: "325.0",
        tagline: "The Sacred Legacy of Raja Bhoj and the Giant Lingam",
        seo_title: "Bhopal | Bhojeshwar Temple, Gufa Mandir & Holy Lakes",
        seo_description: "Discover Bhopal's spiritual heritage. Visit the magnificent monolithic Shiva Lingam at Bhojpur, the historic Gufa Mandir, and pristine sacred lakes.",
        seo_keywords: "Bhopal, Bhojpur, Bhojeshwar Temple, Shiva Lingam, Gufa Mandir, Madhya Pradesh, Raja Bhoj",
        highlights: [
            { name: "Bhojeshwar Temple (Bhojpur)", description: "A grand, unfinished 11th-century temple housing a massive 18-foot tall Shiva Lingam." },
            { name: "Gufa Mandir", description: "A peaceful cave temple dedicated to Lord Shiva, discovered in the mid-20th century." },
            { name: "Manuabhan Tekri", description: "A hilltop temple of high spiritual significance for the Jain community, offering scenic views." }
        ],
        keyRituals: [
            { name: "Maha Shivratri Mela at Bhojpur", description: "A massive gathering of devotees offering milk, water, and bel leaves to the giant Lingam during Shivratri." },
            { name: "Lake Worship (Jal Puja)", description: "Special prayers offered to the Upper Lake, considered a life-giving source since the time of Raja Bhoj." }
        ],
        travelInfo: {
            bestTime: "October to March.",
            howToReach: "Connected by Raja Bhoj Airport and Bhopal Junction Railway Station.",
            nearestAirport: "Raja Bhoj Airport (BHO).",
            nearestRailway: "Bhopal Junction Railway Station (BPL)."
        },
        faqs: [
            { question: "Why is the Bhojpur temple unfinished?", answer: "Historical legends suggest it was due to a sudden war or shift in resources during the reign of King Bhoja, leaving the massive stone dome incomplete." },
            { question: "How far is Bhojpur from Bhopal?", answer: "Bhojpur is about 28 km southeast of Bhopal and takes around 50 minutes to travel by road." }
        ],
        tips: [
            "Visit Bhojpur early in the day to avoid the sun, as the temple has an open-air stone structure.",
            "Dress modestly when visiting cave temples like Gufa Mandir."
        ],
        spiritualEssence: "Bhopal represents the element of water (Apah) and cosmic architecture. The giant lingam at Bhojpur, carved from a single rock, acts as a cosmic antenna grounding the spiritual energy of Central India.",
        longDescription: "Bhopal's spiritual character was established by the legendary Parmara King Raja Bhoj. He constructed the massive Upper Lake and commissioned the Bhojeshwar Temple. The temple remains a wonder of medieval Hindu engineering, with the massive stone slabs lifted using earthen ramps. The city's geography is defined by water, representing emotional purification and reflection. Alongside Hindu shrines, Bhopal is home to historic Jain sites, making it a peaceful sanctuary of diverse faiths.",
        ancientLore: "It is believed that Raja Bhoj suffered from a severe skin disease that could not be cured. A holy saint advised him to construct a lake combining 99 rivers and take a bath in it. The King constructed the Upper Lake, took the holy bath, and was completely cured. In gratitude, he initiated the construction of the giant Shiva temple at Bhojpur.",
        deepInsights: "The unfinished dome of Bhojeshwar Temple is a reminder that the path to the divine is continuous and infinite. It teaches us to value the effort and devotion of the journey over the final attachment of completion."
    },
    {
        name: "Chennai",
        slug: "chennai",
        state: "tn",
        description: "The cultural gateway of South India, Chennai is famous for its ancient Kapaleeshwarar Temple, Parthasarathy Temple, and the vibrant tradition of Carnatic devotion.",
        x: "225.0",
        y: "590.0",
        tagline: "The Shore of Kapaleeshwarar and Carnatic Harmony",
        seo_title: "Chennai | Kapaleeshwarar Temple, Parthasarathy & Dravidian Heritage",
        seo_description: "Experience the spiritual vibrations of Chennai. Discover the 7th-century Kapaleeshwarar Temple, Parthasarathy Temple, and the sacred music traditions of Mylapore.",
        seo_keywords: "Chennai, Mylapore, Kapaleeshwarar Temple, Parthasarathy Temple, Tamil Nadu, Dravidian Architecture, Carnatic Music",
        highlights: [
            { name: "Kapaleeshwarar Temple (Mylapore)", description: "A 7th-century Shiva temple famous for its towering multi-colored Gopuram and sacred tank." },
            { name: "Parthasarathy Temple (Triplicane)", description: "An 8th-century temple dedicated to Lord Krishna as the charioteer of Arjuna." },
            { name: "Vadapalani Murugan Temple", description: "A highly popular temple dedicated to Lord Murugan, frequented by devotees seeking marital and health blessings." }
        ],
        keyRituals: [
            { name: "Panguni Peruvila (Brahmotsavam)", description: "The grand spring festival of Kapaleeshwarar Temple featuring the famous chariot procession." },
            { name: "Margazhi Music Festival", description: "A month-long spiritual celebration in December featuring devotional Carnatic music and prayers." }
        ],
        travelInfo: {
            bestTime: "November to February.",
            howToReach: "Well connected by Chennai International Airport and Chennai Central Railway Station.",
            nearestAirport: "Chennai International Airport (MAA).",
            nearestRailway: "Chennai Central Railway Station (MAS)."
        },
        faqs: [
            { question: "What is the architectural style of Kapaleeshwarar Temple?", answer: "It is built in the classical Dravidian style, characterized by a massive Gopuram, pillared halls, and a large holy water tank." },
            { question: "Is there a dress code for Chennai temples?", answer: "Yes, traditional Indian attire is recommended. Men should wear dhotis or trousers, and women should wear sarees or salwar kameez. Shorts are generally not allowed." }
        ],
        tips: [
            "Visit Mylapore early in the morning to see women drawing beautiful kolams (rice flour designs) in front of their houses.",
            "Try the traditional temple sweet prasadam (Puliyodharai/tamarind rice) at the Parthasarathy temple."
        ],
        spiritualEssence: "Chennai represents the preservation of ancient Vedic and Dravidian lineages. The city is highly attuned to the vibration of sacred sound (Nada Yoga) through Carnatic music, aligning the heart chakra with divine devotion.",
        longDescription: "Chennai, formerly Madras, has preserved its ancient temples despite becoming a major industrial hub. The Mylapore neighborhood, built around the Kapaleeshwarar Temple, has been a center of Tamil culture and Shaivism for over a thousand years. The Parthasarathy Temple in Triplicane holds a unique place as one of the 108 Divya Desams of Lord Vishnu, carrying the physical scars of battle on the face of the deity. The spiritual air of Chennai is filled with the chanting of mantras and the sweet aroma of jasmine and incense, keeping the ancient ways alive in the modern age.",
        ancientLore: "According to legend, Goddess Parvati once did penance here in the form of a peahen (Mayil in Tamil) to gain the grace of Lord Shiva. The place thus came to be known as Mylapore. Another lore says that Sage Vyasa's disciple came here to write scriptures under the guidance of Lord Parthasarathy.",
        deepInsights: "Chennai teaches us that true culture is preserved through sound, music, and daily discipline. The chanting of ancient Tamil hymns (Thevaram and Divya Prabandham) in the temples connects modern generation to a deep lineage of realized saints."
    },
    {
        name: "Coimbatore",
        slug: "coimbatore",
        state: "tn",
        description: "Coimbatore, at the foothills of the Western Ghats, is home to the ancient Perur Patteeswarar Temple and the world-renowned Isha Yoga Center.",
        x: "190.0",
        y: "610.0",
        tagline: "The Foothills of Shiva and the Adiyogi Monolith",
        seo_title: "Coimbatore | Isha Yoga Center, Adiyogi & Perur Patteeswarar Temple",
        seo_description: "Discover Coimbatore's spiritual landscape. Explore the ancient carvings at Perur Patteeswarar and the colossal Adiyogi statue at Isha Yoga Center.",
        seo_keywords: "Coimbatore, Adiyogi, Isha Yoga Center, Perur Patteeswarar Temple, Marudhamalai, Tamil Nadu, Yoga, Western Ghats",
        highlights: [
            { name: "Isha Yoga Center & Adiyogi", description: "Home to the colossal 112-foot Adiyogi statue, Dhyanalinga, and Linga Bhairavi temple." },
            { name: "Perur Patteeswarar Temple", description: "An ancient temple dedicated to Lord Shiva, famous for its exquisite stone carvings and golden hall." },
            { name: "Marudhamalai Murugan Temple", description: "A hilltop temple dedicated to Lord Murugan, nestled in the scenic Western Ghats." }
        ],
        keyRituals: [
            { name: "Dhyanalinga Consecration Anniversary", description: "Special musical offerings and silent meditations held annually at the Dhyanalinga." },
            { name: "Kanakasabhai Aarti", description: "Grand camphor aarti offered to Lord Nataraja in the golden hall of Perur Temple." }
        ],
        travelInfo: {
            bestTime: "September to March.",
            howToReach: "Connected by Coimbatore International Airport and Coimbatore Junction Railway Station.",
            nearestAirport: "Coimbatore International Airport (CJB).",
            nearestRailway: "Coimbatore Junction Railway Station (CBE)."
        },
        faqs: [
            { question: "How far is the Adiyogi statue from Coimbatore city?", answer: "The Adiyogi statue is located at the Isha Yoga Center in the Velliangiri foothills, which is about 30 km from Coimbatore and takes 1 hour to reach." },
            { question: "Can anyone enter the Dhyanalinga?", answer: "Yes, the Dhyanalinga is open to all regardless of faith or belief, and requires no prior registration. Silence must be maintained inside." }
        ],
        tips: [
            "If planning to dip in the Suryakund or Chandrakund at Isha, carry a spare set of clothes.",
            "Take the steps to Marudhamalai temple for a peaceful mountain trek."
        ],
        spiritualEssence: "Coimbatore is a land of spiritual transformation (Sadhana). The presence of the Velliangiri Mountains, often called the 'South Kailash', brings an intense ascetic energy, supported by the protective power of Linga Bhairavi.",
        longDescription: "Nestled against the Western Ghats, Coimbatore has long been a place of retreat for yogis and mystics. The Perur Patteeswarar Temple, built by Karikala Chola, features columns of rare beauty representing the cosmic dance of Lord Shiva. In the modern era, the consecration of the Dhyanalinga and the installation of the Adiyogi have made Coimbatore a global destination for spiritual seekers, showing that the age-old technology of inner well-being is more relevant today than ever.",
        ancientLore: "The Velliangiri Hills are said to be the spot where Lord Shiva performed his cosmic dance at the request of his consort Umadevi. It is also believed that Sage Agastya meditated in these mountains, leaving behind rare spiritual seeds and medicinal herbs for the welfare of humanity.",
        deepInsights: "Coimbatore teaches us that yoga is not a belief system but a science of self-realization. The transition from the highly ritualistic Perur temple to the non-religious Dhyanalinga demonstrates the vast spectrum of Hindu spiritual technology."
    },
    {
        name: "Delhi",
        slug: "delhi",
        state: "dl",
        description: "The capital city Delhi is a mosaic of faiths, featuring the architectural marvel of Akshardham, the historic Birla Mandir, and the serene Lotus Temple.",
        x: "195.0",
        y: "205.0",
        tagline: "The Seat of Sovereignty and Diverse Faiths",
        seo_title: "Delhi | Swaminarayan Akshardham, Lotus Temple & Birla Mandir",
        seo_description: "Explore Delhi's spiritual landmarks. Visit the grand Swaminarayan Akshardham Temple, the historic Kalkaji Mandir, and the Lotus Temple.",
        seo_keywords: "Delhi, Akshardham Delhi, Lotus Temple, Birla Mandir, Kalkaji Mandir, Chhattarpur Temple, Hindu Pilgrimage",
        highlights: [
            { name: "Swaminarayan Akshardham", description: "A massive pink sandstone and marble temple displaying Indian culture, spirituality, and architecture." },
            { name: "Kalkaji Mandir", description: "One of the oldest temples in Delhi, dedicated to Goddess Kalka (an avatar of Durga)." },
            { name: "Chhattarpur Temple", description: "A sprawling temple complex built in South Indian architecture, dedicated to Goddess Katyayani." }
        ],
        keyRituals: [
            { name: "Akshardham Water Show", description: "A breathtaking evening musical fountain show telling a story from the Kena Upanishad." },
            { name: "Kalkaji Navratri Festival", description: "A nine-day festival of intense worship and prayers dedicated to Goddess Durga, drawing lakhs of devotees." }
        ],
        travelInfo: {
            bestTime: "October to March.",
            howToReach: "Well connected by Indira Gandhi International Airport and various major railway stations.",
            nearestAirport: "Indira Gandhi International Airport (DEL).",
            nearestRailway: "New Delhi Railway Station (NDLS)."
        },
        faqs: [
            { question: "Are mobile phones allowed inside Akshardham Temple?", answer: "No, all electronic items, cameras, and bags are strictly prohibited inside the Akshardham complex. Safe storage facilities are available at the entrance." },
            { question: "Is the Lotus Temple a Hindu temple?", answer: "The Lotus Temple is a Bahai House of Worship, open to all people of all religions to pray and meditate in silence." }
        ],
        tips: [
            "Use the Delhi Metro to reach major temples easily and avoid city traffic.",
            "Dedicate at least 4-5 hours to explore the Akshardham complex fully."
        ],
        spiritualEssence: "Delhi represents the Muladhara and Manipur chakras of the nation. It is a place of power, conflict, and eventual spiritual integration, safeguarded by ancient shrines like Yogmaya and Kalkaji.",
        longDescription: "Delhi, known as Indraprastha in the Mahabharata, has been destroyed and rebuilt many times. Its spiritual history is rich, hosting ancient temples like the Yogmaya Temple (associated with Lord Krishna's sister) alongside grand modern complexes like Akshardham. The city has absorbed the vibrations of Sufi saints, Gurudwaras like Bangla Sahib, and peaceful structures like the Lotus Temple. This diversity creates a unique energy where power and peace exist side by side.",
        ancientLore: "According to local legend, the Kalkaji temple dates back to the Satya Yuga. It is believed that the gods were harassed by demons and prayed to Goddess Brahma, who directed them to the Trikuta hill. From the mouth of Goddess Kaushiki, Goddess Kalka emerged and destroyed the demons, deciding to stay here to protect the region.",
        deepInsights: "Delhi teaches that power must be guided by spiritual wisdom to be sustainable. The presence of ancient temples amidst administrative buildings symbolizes that the laws of man must align with the cosmic order (Rita)."
    },
    {
        name: "Hyderabad",
        slug: "hyderabad",
        state: "tg",
        description: "Hyderabad, the City of Pearls, is known for its beautiful Birla Mandir, the massive Statue of Equality, and the ancient Chilkur Balaji Temple.",
        x: "230.0",
        y: "465.0",
        tagline: "The Realm of Venkateswara and the Statue of Equality",
        seo_title: "Hyderabad | Birla Mandir, Chilkur Balaji & Statue of Equality",
        seo_description: "Discover Hyderabad's sacred sites. Visit the hilltop Birla Mandir, the famous Chilkur Balaji temple, and the colossal Statue of Equality.",
        seo_keywords: "Hyderabad, Birla Mandir Hyderabad, Chilkur Balaji, Statue of Equality, Ramanujacharya, Telangana, Hindu Temples",
        highlights: [
            { name: "Birla Mandir", description: "A stunning white marble temple built on a hilltop dedicated to Lord Venkateswara." },
            { name: "Statue of Equality", description: "A 216-foot tall statue dedicated to the 11th-century Vaishnava saint Ramanujacharya." },
            { name: "Chilkur Balaji Temple", description: "An ancient temple dedicated to Lord Balaji, famously known as the 'Visa Balaji' temple." }
        ],
        keyRituals: [
            { name: "Pradakshina at Chilkur Balaji", description: "Devotees perform 11 rounds for wishes and 108 rounds of pradakshina upon fulfillment." },
            { name: "Venkateswara Abhishekam", description: "Friday morning ritual of bathing the deity at Birla Mandir with sacred waters and milk." }
        ],
        travelInfo: {
            bestTime: "October to March.",
            howToReach: "Connected by Rajiv Gandhi International Airport and Secunderabad Railway Station.",
            nearestAirport: "Rajiv Gandhi International Airport (HYD).",
            nearestRailway: "Secunderabad Railway Station (SC)."
        },
        faqs: [
            { question: "Why is Chilkur Balaji called Visa Balaji?", answer: "It gained this nickname because devotees believe praying here helps in clearing visa interviews and resolving travel issues." },
            { question: "Is there a entry fee for the Statue of Equality?", answer: "Yes, there is a ticket fee for visiting the Statue of Equality complex, which helps in the maintenance of the monument and gardens." }
        ],
        tips: [
            "Birla Mandir does not allow cameras or mobile phones; deposit them at the locker counter.",
            "Visit Chilkur Balaji on weekdays to avoid massive weekend queues."
        ],
        spiritualEssence: "Hyderabad represents the balance of material abundance and spiritual equality. The legacy of Saint Ramanujacharya at the Statue of Equality emphasizes the breakdown of social divisions through devotion to Sriman Narayana.",
        longDescription: "Historically governed by the Nizams, Hyderabad has maintained a rich Hindu heritage. The Birla Mandir, constructed in 1976 using 2,000 tons of Rajasthani white marble, stands on the hill of Naubath Pahad, offering a spiritual canopy over the city. The recent consecration of the Statue of Equality by Chinna Jeeyar Swamy has put Hyderabad on the global map of Vaishnavism, celebrating the 1000th birth anniversary of Ramanujacharya and his philosophy of Vishishtadvaita.",
        ancientLore: "It is said that a devotee who could not travel to Tirupati due to health issues was blessed by Lord Venkateswara, who appeared in his dream and told him to find his self-manifested idol in a jungle nearby. The devotee excavated the idol and built the Chilkur Balaji temple, which remains free from commercializations.",
        deepInsights: "Hyderabad teaches that spiritual knowledge is the greatest equalizer. The message of Ramanujacharya, who taught secret mantras to all sections of society, reminds us that the soul has no caste, gender, or race."
    },
    {
        name: "Indore",
        slug: "indore",
        state: "mp",
        description: "The heart of Malwa, Indore is famous for its unique Glass Temple (Kanch Mandir), the massive Khajrana Ganesh Temple, and the historic Annapurna Temple.",
        x: "205.0",
        y: "320.0",
        tagline: "The Malwa Sanctuary of Ganesh and Glass Devotion",
        seo_title: "Indore | Khajrana Ganesh, Kanch Mandir & Annapurna Temple",
        seo_description: "Explore the spiritual energy of Indore. Visit the wish-fulfilling Khajrana Ganesh, the stunning Kanch Mandir, and the majestic Annapurna Temple.",
        seo_keywords: "Indore, Khajrana Ganesh, Kanch Mandir, Annapurna Temple, Madhya Pradesh, Ahilyabai Holkar",
        highlights: [
            { name: "Khajrana Ganesh Temple", description: "A historic temple built by Rani Ahilyabai Holkar, containing a highly revered Ganesh idol." },
            { name: "Kanch Mandir (Glass Temple)", description: "A stunning Jain temple completely lined with multi-colored glass and mirrors." },
            { name: "Annapurna Temple", description: "A grand temple resembling the Madurai Meenakshi temple, dedicated to the Goddess of Food." }
        ],
        keyRituals: [
            { name: "Khajrana Ganesh Abhishek", description: "Daily bathing and dressing of Lord Ganesh with sandalwood paste and decorative ornaments." },
            { name: "Annapurna Annadaan", description: "Serving free holy meals daily to hundreds of pilgrims, honoring the Goddess of Nourishment." }
        ],
        travelInfo: {
            bestTime: "October to March.",
            howToReach: "Connected by Devi Ahilyabai Holkar Airport and Indore Junction Railway Station.",
            nearestAirport: "Devi Ahilyabai Holkar Airport (IDR).",
            nearestRailway: "Indore Junction Railway Station (INDB)."
        },
        faqs: [
            { question: "Who built the Khajrana Ganesh temple?", answer: "The temple was constructed in 1735 by Rani Ahilyabai Holkar of the Maratha Empire after the deity's idol was recovered from a well." },
            { question: "Is Kanch Mandir open to everyone?", answer: "Yes, it is open to all visitors. It is an active Jain temple, so visitors must maintain silence and adhere to temple rules." }
        ],
        tips: [
            "Visit Khajrana Ganesh on Wednesdays, which is considered the day of Lord Ganesha.",
            "Combine your Indore visit with a day trip to the nearby Jyotirlingas of Omkareshwar and Mahakaleshwar."
        ],
        spiritualEssence: "Indore represents the energy of obstacle removal (Vighnaharta) and maternal nourishment. The legacy of Queen Ahilyabai Holkar, who ruled from nearby Maheshwar, infuses the region with a sense of selfless service and administrative dharma.",
        longDescription: "Indore has evolved from a trading outpost of the Holkar dynasty into India's cleanest city. Spiritually, it acts as a gateway to the sacred Narmada valley. The Khajrana Ganesh Temple, once a simple shrine, is now a massive complex and the focal point of Indore's devotion. The Kanch Mandir, built by industrialist Seth Hukumchand, represents the meticulous craftsmanship of Jain devotees, turning a house of prayer into a shining chamber of mirrors that reflect the infinite nature of the soul.",
        ancientLore: "It is believed that to protect the Ganesh idol from Mughal invaders, it was hidden in a well. Rani Ahilyabai Holkar had a dream revealing the location of the idol. She excavated it and built the temple, promising that anyone who prays here with an open heart will have their wishes fulfilled.",
        deepInsights: "Indore teaches us that cleanliness (Swachhata) is indeed next to godliness. The city's achievement in urban cleanliness is a physical manifestation of the internal purification required in spiritual life."
    },
    {
        name: "Jaipur",
        slug: "jaipur",
        state: "rj",
        description: "The Pink City, Jaipur is home to the famous Govind Dev Ji Temple, the ancient Galtaji (Monkey Temple), and the historic Moti Dungri Ganesh Temple.",
        x: "155.0",
        y: "255.0",
        tagline: "The City of Govind Dev Ji and Hilltop Shrines",
        seo_title: "Jaipur | Govind Dev Ji Temple, Galtaji & Moti Dungri Ganesh",
        seo_description: "Discover Jaipur's royal spirituality. Explore the Govind Dev Ji temple, the sacred kunds of Galtaji, and the blessings of Moti Dungri.",
        seo_keywords: "Jaipur, Govind Dev Ji, Galtaji, Moti Dungri, Rajasthan, Pink City, Lord Krishna, Hindu Pilgrimage",
        highlights: [
            { name: "Govind Dev Ji Temple", description: "Located in the City Palace complex, housing the highly revered idol of Krishna brought from Vrindavan." },
            { name: "Galtaji Temple", description: "An ancient pilgrimage site featuring natural water springs (kunds) and historic pavilions built in a mountain pass." },
            { name: "Moti Dungri Ganesh Temple", description: "A popular hilltop temple dedicated to Lord Ganesha, built adjacent to the Moti Dungri palace." }
        ],
        keyRituals: [
            { name: "Govind Dev Ji Aartis", description: "Seven daily public aartis where thousands of devotees gather to catch a glimpse of the Lord." },
            { name: "Makar Sankranti Holy Dip", description: "Taking a purifying bath in the Galta Kund on the occasion of Winter Solstice." }
        ],
        travelInfo: {
            bestTime: "November to February.",
            howToReach: "Connected by Jaipur International Airport and Jaipur Junction Railway Station.",
            nearestAirport: "Jaipur International Airport (JAI).",
            nearestRailway: "Jaipur Junction Railway Station (JP)."
        },
        faqs: [
            { question: "What is the significance of the Govind Dev Ji idol?", answer: "The idol is believed to look exactly like Lord Krishna's physical form during his earthly stay. It was carved by Krishna's great-grandson Vajranabh." },
            { question: "Why is Galtaji called the Monkey Temple?", answer: "It is inhabited by a large tribe of Rhesus macaque monkeys, who are friendly and considered sacred by the pilgrims." }
        ],
        tips: [
            "Attend the Mangala Aarti (first morning aarti) at Govind Dev Ji for a deeply spiritual experience.",
            "Be cautious of your belongings around monkeys at Galtaji; do not carry loose food items."
        ],
        spiritualEssence: "Jaipur represents the beauty and playfulness (Leela) of the divine. The city's structure is aligned with Vastu Shastra, placing the Govind Dev Ji temple at the center, symbolizing that the Lord is the ruler of the city.",
        longDescription: "Jaipur was planned by Maharaja Sawai Jai Singh II in 1727 using principles of Shilpa Shastra. The spiritual heart of the city is the Govind Dev Ji temple. Jai Singh II brought the deity from Vrindavan to protect it from destruction. The deity was placed in the palace gardens so that the King could see it from his room. The Galtaji temple, nestled in the Aravalli hills, has been a center for Ramanandi sadhus and Vaishnava scholars for centuries, making Jaipur a city where royalty and asceticism merge.",
        ancientLore: "It is believed that the sage Galav performed hard penance at Galtaji for a hundred years. Pleased with his devotion, the gods blessed the site with natural spring waters that flow from a rock face shaped like a cow's mouth (Gaumukh), creating seven sacred pools that never run dry.",
        deepInsights: "Jaipur teaches that layout and design can influence consciousness. The mathematical precision of the Pink City's grid, combined with its central devotion to Govind Dev Ji, demonstrates how a community can be structured to support spiritual focus."
    },
    {
        name: "Kanpur",
        slug: "kanpur",
        state: "up",
        description: "An industrial hub with deep spiritual roots, Kanpur features the historic brick temple of Bhitargaon and the beautiful Dwarkadhish and JK temples.",
        x: "265.0",
        y: "250.0",
        tagline: "The Sacred Banks of Ganges and Brick Architecture",
        seo_title: "Kanpur | JK Temple, Bhitargaon Brick Temple & Ganges Ghats",
        seo_description: "Explore Kanpur's spiritual heritage. Visit the unique Gupta-era Bhitargaon brick temple, the white marble JK temple, and sacred Ganges ghats.",
        seo_keywords: "Kanpur, JK Temple, Bhitargaon Temple, Bithoor, Ganges Kanpur, Uttar Pradesh, Brick Temple",
        highlights: [
            { name: "JK Temple (Radha Krishna Mandir)", description: "A beautiful white marble temple combining neo-Gothic and traditional architecture." },
            { name: "Bhitargaon Temple", description: "A rare, surviving 5th-century Gupta Empire brick temple, famous for its terracotta panels." },
            { name: "Bithoor (Brahmavart Ghat)", description: "Located on the outskirts, considered the center of the universe where Lord Brahma performed creation rites." }
        ],
        keyRituals: [
            { name: "Ganga Aarti at Bithoor", description: "Evening lamp-lighting prayers offered on the banks of the Ganges at Brahmavart Ghat." },
            { name: "Janmashtami Celebrations at JK Temple", description: "Grand midnight festival celebrating the birth of Lord Krishna with elaborate decorations." }
        ],
        travelInfo: {
            bestTime: "October to March.",
            howToReach: "Connected by Kanpur Airport and Kanpur Central Railway Station.",
            nearestAirport: "Kanpur Airport (KNU) / Lucknow Airport (LKO).",
            nearestRailway: "Kanpur Central Railway Station (CNB)."
        },
        faqs: [
            { question: "Why is the Bhitargaon temple famous?", answer: "It is the oldest surviving terracota brick temple in India, built during the Gupta period (5th century AD), representing early temple architecture." },
            { question: "What is the spiritual significance of Bithoor?", answer: "Bithoor is believed to be the ashram of Sage Valmiki where Sita gave birth to Luv and Kush, and where Brahma began the creation of mankind." }
        ],
        tips: [
            "Visit Bithoor in the early morning for boat rides on the Ganges.",
            "JK temple looks exceptionally beautiful when illuminated in the evening."
        ],
        spiritualEssence: "Kanpur represents the element of earth (Prithvi) and preservation. The ancient bricks of Bhitargaon and the sacred sands of Bithoor ground the city's commercial energy, linking it to the ancient lineages of creation and Ramayana.",
        longDescription: "While Kanpur is known as the 'Manchester of the East' for its leather and textile industries, it holds historic spiritual importance. Bithoor, situated on the Ganges, is associated with the birth of the epic Ramayana. The Bhitargaon temple stands as a rare survivor of the golden age of the Gupta Empire, showcasing terracotta art representing Vishnu and Shiva. The JK Temple, built by the Singhania family, provides a peaceful sanctuary of white marble in the middle of the bustling industrial city.",
        ancientLore: "It is believed that after the destruction of the universe, Lord Brahma performed the Ashwamedha Yajna here to restart the creation of the cosmos. A nail from his wooden slipper is said to be embedded in the steps of the Brahmavart Ghat, making it the most sacred spot in the region.",
        deepInsights: "Kanpur reminds us that even in industrial environments, the flow of ancient history and sacred rivers continues. The presence of the Ganges at the city's edge cleanses the toxins of commercial life, restoring spiritual balance."
    },
    {
        name: "Lucknow",
        slug: "lucknow",
        state: "up",
        description: "The city of Nawabs, Lucknow has deep Hindu roots with the historic Lakshman Tila, the ancient Hanuman Setu Temple, and the Chandrika Devi Temple.",
        x: "275.0",
        y: "245.0",
        tagline: "The City of Lakshman and the Hanuman Setu Sanctuary",
        seo_title: "Lucknow | Hanuman Setu, Chandrika Devi & Lakshman Tila Heritage",
        seo_description: "Discover Lucknow's spiritual legacy. Explore the Hanuman Setu temple, the ancient Chandrika Devi shrine, and the sacred Gomti River.",
        seo_keywords: "Lucknow, Hanuman Setu, Chandrika Devi, Lakshman Tila, Gomti River, Uttar Pradesh, Lakshmana, Hindu Pilgrimage",
        highlights: [
            { name: "Hanuman Setu Temple", description: "A highly popular temple dedicated to Lord Hanuman, built on the banks of the Gomti River." },
            { name: "Chandrika Devi Temple", description: "Located on the outskirts, an ancient temple dedicated to Goddess Chandrika, associated with the Mahabharata." },
            { name: "Koneshwar Mahadev Temple", description: "One of the oldest Shiva temples in Lucknow, associated with Sage Mandavya." }
        ],
        keyRituals: [
            { name: "Hanuman Setu Bada Mangal", description: "A unique festival celebrated in May/June where millions are served food (bhandaras) across the city." },
            { name: "Chandrika Devi Mundan", description: "Sacred hair-cutting ceremonies performed for infants at the temple tank (Sudhan Kund)." }
        ],
        travelInfo: {
            bestTime: "October to March.",
            howToReach: "Connected by Chaudhary Charan Singh International Airport and Lucknow Charbagh Railway Station.",
            nearestAirport: "Chaudhary Charan Singh International Airport (LKO).",
            nearestRailway: "Lucknow Charbagh Railway Station (LKO)."
        },
        faqs: [
            { question: "Why is the city called Lucknow?", answer: "According to local historical lore, the city was originally named Lakshmanapuri, founded by Lakshmana, the younger brother of Lord Rama." },
            { question: "What is Bada Mangal?", answer: "It is a festival unique to Lucknow, celebrated on the Tuesdays of the Hindu month of Jyeshtha, commemorating the opening of the Hanuman Setu Temple." }
        ],
        tips: [
            "Participate in the Bada Mangal Bhandaras if visiting during summer.",
            "Visit Hanuman Setu in the evening to enjoy the cool breeze of the Gomti River."
        ],
        spiritualEssence: "Lucknow represents the energy of devotion (Bhakti) and brotherhood. The connection to Lakshmana inspires loyalty and duty, while the Hanuman Setu temple acts as a bridge of faith over the slow-flowing Gomti River.",
        longDescription: "Lucknow, the capital of Uttar Pradesh, is often associated with Awadhi culture and Nawabi heritage. However, its foundation is tied to the Ramayana. The high ground near the Gomti River, known as Lakshman Tila, is believed to be the site of Lakshmana's original outpost. The Hanuman Setu temple, built in the mid-20th century by the saint Neem Karoli Baba, has become the city's spiritual anchor. The Chandrika Devi Temple, situated in a quiet forest area, links Lucknow to the era of the Mahabharata, creating a long tapestry of faith.",
        ancientLore: "It is believed that when Lakshmana founded the city, he built a tunnel leading to the Sarayu river in Ayodhya. Another legend at Chandrika Devi states that Barbareek, the grandson of Bheem, meditated here. Goddess Durga appeared to him as Chandrika, blessing him with unmatched strength for the Mahabharata war.",
        deepInsights: "Lucknow teaches that culture and faith can blend harmoniously. The celebration of Bada Mangal, where people of all communities participate in serving food, shows that devotion has the power to unite diverse populations."
    },
    {
        name: "Mysuru",
        slug: "mysuru",
        state: "ka",
        description: "The cultural capital of Karnataka, Mysuru is famous for the Chamundeshwari Temple on the Chamundi Hills and the grand celebration of Dasara.",
        x: "175.0",
        y: "530.0",
        tagline: "The Hilltop Abode of Chamundeshwari and Royal Dasara",
        seo_title: "Mysuru | Chamundeshwari Temple, Chamundi Hills & Royal Heritage",
        seo_description: "Experience the royal spirituality of Mysuru. Visit the Chamundeshwari Temple, climb the Chamundi Hills, and witness the grand Dasara festival.",
        seo_keywords: "Mysuru, Mysore, Chamundeshwari Temple, Chamundi Hills, Mysore Dasara, Karnataka, Shakti Peeth, Nandi Monolith",
        highlights: [
            { name: "Chamundeshwari Temple", description: "A high-power temple on Chamundi Hills dedicated to Goddess Durga, who destroyed the demon Mahishasura." },
            { name: "Nandi Monolith", description: "A majestic 15-foot high monolithic statue of Nandi, located halfway up the Chamundi Hills." },
            { name: "Mysore Palace Temples", description: "A collection of beautiful temples located inside the palace fort, representing Hoysala and Vijayanagara styles." }
        ],
        keyRituals: [
            { name: "Mysore Dasara", description: "A 10-day state festival celebrating the victory of the Goddess over the demon, featuring a grand procession of elephants." },
            { name: "Chamundi Ashada Shukravara", description: "Special prayers performed on the Fridays of the Ashada month, drawing thousands to the hills." }
        ],
        travelInfo: {
            bestTime: "September to March.",
            howToReach: "Connected by Mysore Airport and Mysore Railway Station, or via a 2-hour highway drive from Bangalore.",
            nearestAirport: "Mysore Airport (MYQ) / Bangalore Airport (BLR).",
            nearestRailway: "Mysuru Junction Railway Station (MYS)."
        },
        faqs: [
            { question: "How many steps are there to Chamundi Hills?", answer: "There are 1,008 stone steps built by the Maharajas of Mysore, leading to the temple at the summit." },
            { question: "Is Chamundeshwari temple a Shakti Peeth?", answer: "Yes, it is considered one of the 18 Maha Shakti Peeths (Ashtadasa Shakti Peethas), marking the spot where the hair of Goddess Sati fell." }
        ],
        tips: [
            "Climb the steps early in the morning to enjoy the cool weather and meet local runners and pilgrims.",
            "Hire a taxi to the hilltop if traveling with elderly family members."
        ],
        spiritualEssence: "Mysuru represents the victory of consciousness (Shakti) over the animalistic ego (Mahishasura). The presence of the Chamundeshwari temple on the hills overlooking the city acts as a constant reminder of divine victory and protection.",
        longDescription: "Mysuru, named after the demon Mahishasura (Mahishooru), is a city of royal elegance and deep spiritual traditions. The Wodeyar kings ruled under the patronage of Goddess Chamundeshwari, who is the family deity of the royal family. The Mysore Palace contains several historic temples like the Lakshmiramana temple. The Dasara festival, which began in the 14th century under the Vijayanagara Empire, is celebrated with unparalleled royal grandeur, making the city a living museum of Hindu culture and rituals.",
        ancientLore: "According to the Devi Mahatmya, the demon Mahishasura harassed the gods. The Trinity of Brahma, Vishnu, and Shiva combined their energies to create Goddess Durga. She took the form of Chamundeshwari, fought a fierce battle on the hills, and slew the demon, establishing peace in the region.",
        deepInsights: "Mysuru teaches us that power must bow to the divine mother. The Maharajas of Mysore dedicated their kingdom to Goddess Chamundeshwari, ruling as her representatives, showing a beautiful model of royal humility (Dharma-rajya)."
    },
    {
        name: "Nagpur",
        slug: "nagpur",
        state: "mh",
        description: "The Orange City, Nagpur is the geographic center of India, housing the historic Tekdi Ganesh Temple and the peaceful Deekshabhoomi.",
        x: "210.0",
        y: "380.0",
        tagline: "The Center of Bharat and the Tekdi Ganesh Sanctuary",
        seo_title: "Nagpur | Tekdi Ganesh, Deekshabhoomi & Koradi Temple",
        seo_description: "Explore the spiritual center of India. Visit the Swayambhu Tekdi Ganesh, the massive Deekshabhoomi dome, and the ancient Koradi temple.",
        seo_keywords: "Nagpur, Tekdi Ganesh, Deekshabhoomi, Koradi Temple, Maharashtra, Zero Mile, Swayambhu Ganesh",
        highlights: [
            { name: "Tekdi Ganesh Temple", description: "A highly popular temple dedicated to Lord Ganesh, whose idol is believed to be self-manifested (Swayambhu)." },
            { name: "Deekshabhoomi", description: "A sacred monument of Buddhism, housing the largest hollow dome in Asia, where Dr. B.R. Ambedkar converted to Buddhism." },
            { name: "Koradi Jagdamba Temple", description: "Located on the outskirts, a powerful temple dedicated to Goddess Durga, attracting massive crowds during Navratri." }
        ],
        keyRituals: [
            { name: "Tekdi Ganesh Chaturthi", description: "A grand celebration of Ganesha's birth featuring continuous abhishekams and public processions." },
            { name: "Dhamma Chakra Pravartan Din", description: "An annual gathering of millions at Deekshabhoomi to commemorate the historic conversion of 1956." }
        ],
        travelInfo: {
            bestTime: "October to March.",
            howToReach: "Connected by Dr. Babasaheb Ambedkar International Airport and Nagpur Junction Railway Station.",
            nearestAirport: "Dr. Babasaheb Ambedkar International Airport (NAG).",
            nearestRailway: "Nagpur Junction Railway Station (NGP)."
        },
        faqs: [
            { question: "Why is the Ganesh temple called 'Tekdi'?", answer: "The word 'Tekdi' in Marathi means a hill. The temple is located on a hillock, hence the name Tekdi Ganesh." },
            { question: "What is the significance of the Deekshabhoomi dome?", answer: "It is a monument representing social equality and peaceful spiritual transition, built in the shape of a Sanchi Stupa." }
        ],
        tips: [
            "Visit the Zero Mile Stone near the railway station, which marks the exact geographical center of undivided India.",
            "Koradi temple has a beautiful illumination during Navratri nights."
        ],
        spiritualEssence: "Nagpur represents the heart and central axis (Sushumna Nadi) of the country. Its central location makes it a gathering point for diverse spiritual energies, grounding the nation with the protective presence of Tekdi Ganesh.",
        longDescription: "Nagpur, situated in the Vidarbha region of Maharashtra, is geographically located at the center of India. This central energy is reflected in its spiritual heritage. The Tekdi Ganesh Temple has been the city's protector for centuries, with the idol being worshipped since the time of the Bhonsle dynasty. The construction of Deekshabhoomi in 1956 introduced a major Buddhist element to the city, creating a unique synthesis of ancient Hindu devotion and modern spiritual equality.",
        ancientLore: "It is believed that the idol of Tekdi Ganesh is growing in size over the years. During the construction of a military defense fort in the British era, workers tried to break the hill but discovered the self-manifested idol of Lord Ganesh. The work was stopped, and the shrine was preserved.",
        deepInsights: "Nagpur teaches that balance is found at the center. The city's geography and history show that true strength lies in hosting multiple spiritual traditions in a state of harmonious balance."
    },
    {
        name: "Pune",
        slug: "pune",
        state: "mh",
        description: "The cultural capital of Maharashtra, Pune is home to the historic Dagadusheth Halwai Ganapati Temple, the ancient Pataleshwar Cave Temple, and the Alandi pilgrimage site nearby.",
        x: "145.0",
        y: "435.0",
        tagline: "The Realm of Dagadusheth and the Saintly Alandi",
        seo_title: "Pune | Dagadusheth Halwai Ganesh, Pataleshwar & Alandi Shrines",
        seo_description: "Experience the vibrant devotion of Pune. Visit the famous Dagadusheth Ganapati, the 8th-century Pataleshwar caves, and the sacred samadhi of Dnyaneshwar at Alandi.",
        seo_keywords: "Pune, Dagadusheth Halwai, Pataleshwar, Alandi, Dnyaneshwar, Maharashtra, Ganeshotsav, Peshwas",
        highlights: [
            { name: "Dagadusheth Halwai Ganapati Temple", description: "Famous for its grand golden Ganapati idol, one of the most visited shrines in Maharashtra." },
            { name: "Pataleshwar Cave Temple", description: "An 8th-century rock-cut cave temple dedicated to Lord Shiva, carved out of a single basalt rock." },
            { name: "Alandi (Saint Dnyaneshwar Samadhi)", description: "Located 22 km away, the sacred resting place of the 13th-century saint Dnyaneshwar on the Indrayani River." }
        ],
        keyRituals: [
            { name: "Pune Ganeshotsav", description: "A 10-day public festival initiated by Lokmanya Tilak, featuring massive public pandals and traditional dhol-tasha beats." },
            { name: "Kartik Ekadashi at Alandi", description: "A massive pilgrimage (Wari) where lakhs of Warkaris gather to pay homage to Saint Dnyaneshwar." }
        ],
        travelInfo: {
            bestTime: "October to March.",
            howToReach: "Connected by Pune Airport and Pune Railway Station, or via a 3-hour drive from Mumbai.",
            nearestAirport: "Pune International Airport (PNQ).",
            nearestRailway: "Pune Junction Railway Station (PUNE)."
        },
        faqs: [
            { question: "Who built the Dagadusheth Halwai temple?", answer: "It was built in 1893 by Dagadusheth Halwai, a sweet maker, and his wife Lakshmibai after they lost their son to a plague epidemic, guided by their guru." },
            { question: "Is Pataleshwar temple active?", answer: "Yes, it is an active monument managed by the ASI. Devotees offer prayers to the Shiva Lingam inside the cave daily." }
        ],
        tips: [
            "Visit Pune during Ganesh Chaturthi to witness the legendary dhol-tasha pathaks (drumming troupes).",
            "Keep a day to visit Alandi and Dehu to understand the rich Bhakti tradition of Maharashtra."
        ],
        spiritualEssence: "Pune represents the intellect (Pragna) and Maratha valor aligned with deep devotion. The legacy of saints like Dnyaneshwar and Tukaram brings a sweet, poetic Bhakti energy, balanced by the royal protective presence of Ganesha.",
        longDescription: "Pune, the seat of the Peshwas, has been a major center of Maharashtrian culture. The city's spirituality is defined by the Bhakti movement. Nearby Alandi and Dehu are the birthplaces of Saint Dnyaneshwar and Tukaram, who translated Sanskrit scriptures into local Marathi, making spiritual knowledge accessible to the masses. The public celebration of Ganeshotsav, started here by Tilak in 1893, transformed a private worship into a national movement of unity and resistance.",
        ancientLore: "It is believed that Saint Dnyaneshwar entered into Sanjeevan Samadhi (voluntary transition) at the young age of 21, sitting beneath an Ajanjan tree in Alandi. Devotees believe that his spiritual body is still meditating beneath the stone slab, blessing the river Indrayani and all who visit.",
        deepInsights: "Pune teaches that language should not be a barrier to divine love. The work of the warkari saints, who sang praises in the language of the common man, highlights that the heart's sincerity is the only qualification for grace."
    },
    {
        name: "Ranchi",
        slug: "ranchi",
        state: "jh",
        description: "The city of waterfalls, Ranchi is famous for the hilltop Ranchi Hill Temple (Pahari Mandir) and the historic Jagannath Temple built on a hillock.",
        x: "360.0",
        y: "325.0",
        tagline: "The Hilltop Shrines of Shiva and Jagannath",
        seo_title: "Ranchi | Pahari Mandir, Jagannath Temple & Sacred Waterfalls",
        seo_description: "Explore Ranchi's spiritual elevation. Visit the hilltop Pahari Mandir dedicated to Lord Shiva, the historic Jagannath Temple, and serene waterfalls.",
        seo_keywords: "Ranchi, Pahari Mandir, Jagannath Temple Ranchi, Jharkhand, Shiva Hill, Rath Yatra Ranchi",
        highlights: [
            { name: "Pahari Mandir (Ranchi Hill)", description: "A temple dedicated to Lord Shiva located on a 250-foot hill, offering panoramic views of the city." },
            { name: "Jagannath Temple", description: "A 17th-century temple built on a hillock, resembling the architecture of the famous Puri Jagannath Temple." },
            { name: "Sun Temple", description: "Located on the Tata Road, a beautiful temple built in the shape of a massive chariot with 18 wheels." }
        ],
        keyRituals: [
            { name: "Shravan Month Pilgrimage at Pahari Mandir", description: "Thousands of kanwariyas carry holy water from the Swarnarekha River to pour on the Shiva Lingam at the hilltop." },
            { name: "Ranchi Rath Yatra", description: "An annual festival at the Jagannath Temple where the deities visit their aunt's temple, drawing massive tribal and local crowds." }
        ],
        travelInfo: {
            bestTime: "October to March.",
            howToReach: "Connected by Birsa Munda Airport and Ranchi Railway Station.",
            nearestAirport: "Birsa Munda Airport (IXR).",
            nearestRailway: "Ranchi Junction Railway Station (RNC)."
        },
        faqs: [
            { question: "How many steps are there to Pahari Mandir?", answer: "There are approximately 468 steps to climb to reach the Shiva temple at the top of the hill." },
            { question: "Who built the Ranchi Jagannath Temple?", answer: "It was built in 1691 by King Ani Nath Shahdeo of the Chhotanagpur royal family." }
        ],
        tips: [
            "Wear comfortable walking shoes for climbing the hills.",
            "Visit the Sun Temple during sunrise to see the beautiful light reflecting off the chariot architecture."
        ],
        spiritualEssence: "Ranchi represents the natural, tribal connection to the divine (Aranyaka Bhakti). The hilltop temples bring an energy of elevation, rising above the dense forests of Jharkhand to seek cosmic communion with Shiva and Jagannath.",
        longDescription: "Ranchi, the capital of Jharkhand, is surrounded by hills, rivers, and waterfalls. Its spiritual identity is shaped by the land's geology. The Pahari Mandir stands on a volcanic hill that has been a place of worship since pre-historic times. The Jagannath Temple, constructed in the late 17th century, introduced the Vaishnava traditions of Odisha to the tribal heartland of Chhotanagpur, creating a beautiful synthesis of local tribal culture and mainstream Hindu rituals.",
        ancientLore: "Pahari Mandir has a rich history; during the British Raj, the hill was used to hang freedom fighters. After independence, the temple became the first in India to hoist the national flag on its mast, alongside the religious flag, to honor the martyrs.",
        deepInsights: "Ranchi teaches us that nature is the first temple. The placement of shrines on hills and near waterfalls shows that the early sages recognized the natural features of the earth as direct manifestations of the divine presence."
    },
    {
        name: "Surat",
        slug: "surat",
        state: "gj",
        description: "A major commercial port since ancient times, Surat features the historic Ambika Niketan Temple and the beautiful Chintamani Parswanath Jain Temple.",
        x: "65.0",
        y: "360.0",
        tagline: "The Coastal Sanctuary of Ambika and Jain Artistry",
        seo_title: "Surat | Ambika Niketan, Chintamani Jain Temple & Tapi River",
        seo_description: "Discover Surat's spiritual heritage. Visit the Ambika Niketan temple on the banks of the Tapi River and the historic Chintamani Jain Temple.",
        seo_keywords: "Surat, Ambika Niketan, Chintamani Jain Temple, Tapi River, Gujarat, Hindu Pilgrimage, Jain Art",
        highlights: [
            { name: "Ambika Niketan Temple", description: "A highly popular temple dedicated to Goddess Ambika, situated on the banks of the Tapi River." },
            { name: "Chintamani Parswanath Jain Temple", description: "A 400-year-old Jain temple famous for its exquisite wooden carvings and historic paintings." },
            { name: "ISKCON Temple (Sri Sri Radha Damodar)", description: "A beautiful temple and spiritual retreat located on the Rander Road." }
        ],
        keyRituals: [
            { name: "Navratri Garba at Ambika Niketan", description: "Traditional Garba dance and special night-long prayers offered to Goddess Ambika during Navratri." },
            { name: "Tapi River Worship (Tapi Maiya Aarti)", description: "Evening prayers offered to the sacred river Tapi, considered the daughter of the Sun God." }
        ],
        travelInfo: {
            bestTime: "October to March.",
            howToReach: "Connected by Surat Airport and Surat Railway Station.",
            nearestAirport: "Surat Airport (STV).",
            nearestRailway: "Surat Railway Station (ST)."
        },
        faqs: [
            { question: "When was Ambika Niketan Temple built?", answer: "The temple was founded in 1969 by late Jyotindra Sen and houses a beautiful white marble idol of Goddess Ambika." },
            { question: "What is special about Chintamani Jain Temple?", answer: "Built during the reign of Emperor Aurangzeb, it has survived centuries and contains rare wooden pillars displaying Gujarati Jain carving." }
        ],
        tips: [
            "Visit the Tapi Riverfront in the evening for a cool breeze and a serene view of the river.",
            "Try the local Surat vegetarian delicacies (Surati Ghari and Locho) offered near the temples."
        ],
        spiritualEssence: "Surat represents the flow of abundance and preservation. The sacred Tapi River, daughter of Surya, brings an energy of warmth and purification, supported by the maternal protective power of Goddess Ambika.",
        longDescription: "Surat, historically known as Suryapur, was a major trading port long before it became the diamond capital of India. Spiritually, it is anchored by the Tapi River. The Ambika Niketan Temple has been a place of refuge for the city's residents. The Chintamani Jain Temple stands as a monument of religious resilience, constructed with a simple exterior to avoid Mughal destruction while preserving a treasure trove of wooden art and spiritual murals inside.",
        ancientLore: "According to Hindu Puranas, the Tapi River is the daughter of Surya (the Sun God) and Chhaya (the shadow). She was created to protect the earth from the intense heat of the Sun, making the river a symbol of cooling grace and maternal protection.",
        deepInsights: "Surat teaches that inner beauty is more important than external display. The design of the Chintamani Jain temple—hiding magnificent gold leaf carvings behind a plain facade—reminds us to protect our inner spiritual treasure from external distractions."
    },
    {
        name: "Vadodara",
        slug: "vadodara",
        state: "gj",
        description: "The cultural capital of Gujarat, Vadodara is home to the unique EME Temple, the ancient Kuber Bhandari Temple, and the Laxmi Vilas Palace shrines.",
        x: "70.0",
        y: "355.0",
        tagline: "The Realm of Kuber and Modern Temple Architecture",
        seo_title: "Vadodara | EME Temple, Kuber Bhandari & Laxmi Vilas Shrines",
        seo_description: "Discover Vadodara's spiritual landscape. Explore the unique aluminum dome of EME temple, the wish-fulfilling Kuber Bhandari, and royal heritage.",
        seo_keywords: "Vadodara, Baroda, EME Temple, Kuber Bhandari, Gujarat, Narmada River, Laxmi Vilas Palace, Hindu Pilgrimage",
        highlights: [
            { name: "EME Temple (Dakshinamurthy Temple)", description: "A unique geodetic dome temple built of aluminum sheets by the Indian Army, dedicated to Lord Shiva." },
            { name: "Kuber Bhandari Temple (Karnali)", description: "Located 60 km away on the Narmada River, the supreme temple dedicated to Lord Kuber, the god of wealth." },
            { name: "Kayavarohan Temple", description: "Located 30 km away, a historic site believed to be the birthplace of Lakulisha, the founder of Pashupata Shaivism." }
        ],
        keyRituals: [
            { name: "Kuber Bhandari Amavasya Puja", description: "Special prayers held on No-Moon nights, attracting lakhs of devotees seeking financial and spiritual abundance." },
            { name: "EME Temple Aarti", description: "A highly disciplined daily evening worship conducted inside the modern aluminum structure." }
        ],
        travelInfo: {
            bestTime: "October to March.",
            howToReach: "Connected by Vadodara Airport and Vadodara Junction Railway Station.",
            nearestAirport: "Vadodara Airport (BDQ).",
            nearestRailway: "Vadodara Junction Railway Station (BRC)."
        },
        faqs: [
            { question: "What is unique about the EME Temple?", answer: "It is built with a geodetic dome structure using aluminum sheets, representing various religions: the tower is Christian, the dome is Islamic, the entrance is Jain, the structure is Buddhist, and the deity is Hindu (Shiva)." },
            { question: "What is the significance of Kayavarohan?", answer: "It is one of the sixty-eight sacred Shiva temples mentioned in the Shiva Purana, believed to be the spot where Shiva incarnated as Lakulisha." }
        ],
        tips: [
            "Avoid carrying bags and cameras to EME Temple due to military security check at the entrance.",
            "Hire a boat at Karnali to cross the Narmada and reach the Kuber Bhandari temple peacefully."
        ],
        spiritualEssence: "Vadodara represents the integration of ancient heritage and scientific design. The unique structure of EME temple demonstrates how modern engineering can host spiritual energies, while Kuber Bhandari grounds the abundance of the Narmada valley.",
        longDescription: "Vadodara, formerly Baroda, was ruled by the Gaekwad dynasty. The royal family constructed beautiful temples inside the palace grounds. The city's spiritual landscape is defined by its proximity to the Narmada River. The EME temple, built in 1966, represents a bold experiment in modern temple design, while Kayavarohan preserves the ancient esoteric teachings of Pashupata Shaivism, making Vadodara a place where the old and the new exist in creative tension.",
        ancientLore: "Legend has it that Lord Shiva incarnated as Lakulisha (the lord with a staff) at Kayavarohan, entering a dead body to teach the secrets of yoga. Another legend at Kuber Bhandari states that Lord Kuber performed hard penance here on the Narmada, and Lord Shiva blessed him, making him the treasurer of the gods.",
        deepInsights: "Vadodara teaches us that the temple structure can evolve with time. The use of aluminum and geodetic design at the EME temple shows that the divine can be housed in modern forms, reflecting a flexible and creative spiritual outlook."
    }
];

// Generate SQL migration string
let sql = `-- Migration to populate the 17 serving cities in Spritual_locations
-- Generated on: ${new Date().toISOString()}

`;

// Generate random UUID helper
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

citiesData.forEach((city) => {
    const id = uuidv4();
    const imagesArray = `ARRAY['${city.slug === "ahmedabad" ? "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1200&q=80" : 
                             city.slug === "bangalore" ? "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80" :
                             "https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80"}']`;
    
    const contentObj = {
        faqs: city.faqs,
        tips: city.tips,
        highlights: city.highlights,
        keyRituals: city.keyRituals,
        travelInfo: city.travelInfo,
        ancientLore: city.ancientLore,
        deepInsights: city.deepInsights,
        relationships: {
            related_blogs: [],
            related_pujas: [],
            related_festivals: [],
            nearby_destinations: []
        },
        longDescription: city.longDescription,
        vedicReferences: "Mentioned in local Puranas and sthalas celebrating the sacred geography of India.",
        spiritualEssence: city.spiritualEssence,
        spiritualArchitecture: city.highlights.map(h => `${h.name}: ${h.description}`).join(' ')
    };

    const contentStr = JSON.stringify(contentObj).replace(/'/g, "''");

    sql += `
-- Delete existing slug if any to prevent unique constraint violation
DELETE FROM "public"."Spritual_locations" WHERE "slug" = '${city.slug}';

INSERT INTO "public"."Spritual_locations" (
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
    "created_at", 
    "updated_at", 
    "is_active", 
    "tagline", 
    "seo_title", 
    "seo_description", 
    "seo_keywords", 
    "order_rank", 
    "content", 
    "show_on_home", 
    "home_order", 
    "name_hi", 
    "tagline_hi", 
    "description_hi", 
    "home_image_url"
) VALUES (
    '${id}',
    '${city.name}',
    '${city.slug}',
    'Spiritual City',
    '${city.state}',
    '${city.description.replace(/'/g, "''")}',
    '${city.x}',
    '${city.y}',
    '12',
    ${imagesArray},
    'false',
    NOW(),
    NOW(),
    'true',
    '${city.tagline.replace(/'/g, "''")}',
    '${city.seo_title.replace(/'/g, "''")}',
    '${city.seo_description.replace(/'/g, "''")}',
    '${city.seo_keywords.replace(/'/g, "''")}',
    '50',
    '${contentStr}',
    'false',
    null,
    null,
    null,
    null,
    null
);
`;
});

// Output migration SQL file
const outputPath = path.join(__dirname, '..', 'missing_cities_migration.sql');
fs.writeFileSync(outputPath, sql);
console.log('Migration generated successfully at:', outputPath);
