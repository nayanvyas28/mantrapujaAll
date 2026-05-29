-- PART 7
INSERT INTO "public"."spiritual_places" ("name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES ('Chorabari Tal', 
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
}') ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";