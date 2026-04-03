export interface PujaData {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    heroImage: string;
    themeColor: string; // e.g., 'saffron', 'gold', 'blue' - useful for subtle dynamic styling

    // Hero Section Benefits
    heroBenefits: string[];

    // About Section
    hero?: {
        badgeText?: string;
        glassBadgeLabel?: string;
        glassBadgeValue?: string;
    };
    about: {
        title: string;
        description: string;
        heading?: string;
        subheading?: string;
        significance: string;
        significanceTitle?: string;
        whoShouldPerform: string;
        whoShouldPerformTitle?: string;
    };

    // Why Perform Section
    whyPerform: {
        title: string;
        reasons: {
            icon: string;
            title: string;
            description: string;
        }[];
    };

    // Process Section
    process: {
        title: string;
        subtitle?: string;
        steps: {
            step: number;
            title: string;
            description: string;
        }[];
        features: string[]; // e.g., "Verified Pandits", "Live Video"
    };

    // How It Works Loop (Standard 3 steps usually, but good to have data)
    howItWorks: {
        steps: {
            icon: string;
            title: string;
            description: string;
        }[];
    };

    // Benefits Section
    benefits: {
        title: string;
        cards: {
            title: string;
            description: string;
            icon: string;
        }[];
    };

    // When to Perform
    timing: {
        subtitle?: string;
        title: string;
        occasionsTitle?: string;
        muhuratTitle?: string;
        occasions: string[];
        muhurat: string;
    };
    footer?: {
        title?: string;
        description?: string;
    };

    testimonials: {
        title?: string;
        reviews: {
            name: string;
            location: string;
            comment: string;
            rating: number;
            avatar?: string;
        }[];
    };

    faq: {
        title?: string;
        items: {
            question: string;
            answer: string;
        }[];
    };
    seoTitle?: string;
    seoDescription?: string;
}

export const pujas: PujaData[] = [
    {
        id: "kaal-sarp-dosh",
        slug: "kaal-sarp-dosh-puja",
        name: "Kaal Sarp Dosh Nivaran Puja",
        tagline: "Break Free from Life's Obstacles & Achieve Success",
        heroImage: "/puja images/kaal sarp.png",
        themeColor: "saffron",
        heroBenefits: [
            "Remove career & marriage blockages",
            "Restore peace & mental clarity",
            "Vedic ritual by Kashi/Ujjain Pandits"
        ],
        hero: {
            badgeText: "Premium Vedic Ritual",
            glassBadgeLabel: "Performed By",
            glassBadgeValue: "Certified Vedic Archaryas"
        },
        about: {
            title: "What is Kaal Sarp Dosh Puja?",
            heading: "Ancient Wisdom",
            subheading: "For Modern Life",
            description: "Kaal Sarp Dosh occurs when all seven planets come between Rahu and Ketu in a horoscope. This dosha can cause struggles in career, health, finances, and relationships.",
            significance: "This powerful Vedic ritual creates a protective shield, pacifies Rahu and Ketu, and opens doors to prosperity and peace.",
            whoShouldPerform: "Anyone experiencing consistent failures, delay in marriage, financial instability, or unexplained health issues despite best efforts."
        },
        whyPerform: {
            title: "Why Perform this Puja?",
            reasons: [
                { icon: "🌟", title: "Career Growth", description: "Clear hidden obstacles blocking your professional success." },
                { icon: "❤️", title: "Relationship Harmony", description: "Resolve conflicts and delays in marriage or family life." },
                { icon: "rupee", title: "Financial Stability", description: "Stop unexpected losses and attract wealth and abundance." },
                { icon: "peace", title: "Mental Peace", description: "Overcome anxiety, stress, and unknown fears." }
            ]
        },
        process: {
            title: "Our Authentic Ritual Process",
            steps: [
                { step: 1, title: "Sankalp (Vow)", description: "The Pandit takes a personalized vow in your name and gotra." },
                { step: 2, title: "Ganesh & Kalash Puja", description: "Invoking Lord Ganesha and established deities for blessings." },
                { step: 3, title: "Rahu-Ketu Jaap", description: "Chanting of powerful Vedic mantras to pacify the shadow planets." },
                { step: 4, title: "Nagbali & Havan", description: "Offerings into the sacred fire to complete the purification." },
                { step: 5, title: "Purnahuti & Aarti", description: "Final offerings and concluding prayers for your well-being." }
            ],
            features: ["Executed by 5+ Vedic Pandits", "Samagri included", "Live Streaming Available", "Prasad Delivery to Home"]
        },
        howItWorks: {
            steps: [
                { icon: "📝", title: "Book Online", description: "Select your preferred date and provide your birth details." },
                { icon: "🙏", title: "Puja Performance", description: "Our Pandits perform the ritual with strict Vedic vidhi." },
                { icon: "📦", title: "Receive Blessings", description: "Get the video recording and sacred Prasad delivered to you." }
            ]
        },
        benefits: {
            title: "Life-Changing Benefits",
            cards: [
                { icon: "🚀", title: "Success Acceleration", description: "Experience a sudden boost in career and business growth." },
                { icon: "🛡️", title: "Protection", description: "Shield yourself creates a positive aura against negativity." },
                { icon: "👨‍👩‍👧", title: "Family Bliss", description: "Restore happiness and understanding in family relationships." },
                { icon: "🧘", title: "Health & Vitality", description: "Improve physical health and mental well-being." }
            ]
        },
        timing: {
            subtitle: "Muhurat",
            title: "Best Time to Perform",
            occasions: ["Nag Panchami", "Amavasya (New Moon)", "Solar/Lunar Eclipse", "Maha Shivratri"],
            muhurat: "Any Monday or specifically during the Rahu Kalam period as advised by astrologers."
        },
        footer: {
            title: "Ready to Invite Divine Blessings?",
            description: "Don't wait for the \"perfect time\". The moment you decide to connect with the divine is the perfect muhurat."
        },
        testimonials: {
            reviews: [
                { name: "Rahul Sharma", location: "Mumbai", comment: "After years of struggle, I finally found stability in my job within 2 months of this puja.", rating: 5, avatar: "RS" },
                { name: "Priya Patel", location: "London", comment: "The live streaming was excellent. I felt connected to the ritual from home.", rating: 5, avatar: "PP" },
                { name: "Amit Verma", location: "Delhi", comment: "Very professional service. The Pandits were knowledgeable and authentic.", rating: 4.8, avatar: "AV" }
            ]
        },
        faq: {
            items: [
                { question: "Can I perform this puja online?", answer: "Yes, our 'e-Puja' service allows you to participate via live video call. The ritual effectiveness remains the same as our Pandits perform it with your Sankalp." },
                { question: "What details do I need to provide?", answer: "We need your Full Name, Gotra (if known), Date, Time, and Place of Birth for the Sankalp." },
                { question: "How long does the puja take?", answer: "A complete Kaal Sarp Dosh Nivaran Puja typically takes 3 to 4 hours depending on the specific vidhi." },
                { question: "Do I get Prasad?", answer: "Yes, we ship the energized Prasad, Yantra, and Raksha Sutra to your address worldwide." }
            ]
        }
    },
    {
        id: "satyanarayan-pooja",
        slug: "satyanarayan-pooja", // Updated slug to match homepage
        name: "Satyanarayan Katha & Puja",
        tagline: "Invite Prosperity & Happiness into Your Home",
        heroImage: "https://www.vedicvaani.com/img/cms/1_1.jpg",
        themeColor: "gold",
        heroBenefits: [
            "Blessings for new beginnings",
            "Gratitude for achievements",
            "Peace and harmony in family"
        ],
        about: {
            title: "What is Satyanarayan Puja?",
            description: "The Satyanarayan Puja is a religious worship of the Hindu god Vishnu, who is also known as Satyanarayan. It is usually performed on a full moon day (Purnima).",
            significance: "It serves as a gesture of gratitude to the Lord during achievements or auspicious occasions.",
            whoShouldPerform: "Families entering a new home, couples recently married, or anyone wishing to thank the divine for success."
        },
        whyPerform: {
            title: "Why Perform this Puja?",
            reasons: [
                { icon: "🏠", title: "Housewarming", description: "Perfect for seeking blessings for a new home." },
                { icon: "💍", title: "Marriage", description: "Blesses the couple with a happy & long married life." },
                { icon: "🎓", title: "Success", description: "Celebrating career or academic milestones." },
                { icon: "☮️", title: "General Well-being", description: "For peace of mind and family prosperity." }
            ]
        },
        process: {
            title: "Our Authentic Ritual Process",
            steps: [
                { step: 1, title: "Ganesh Puja", description: "Invoking Lord Ganesha to remove obstacles." },
                { step: 2, title: "Navagraha Puja", description: "Worshipping the nine planets." },
                { step: 3, title: "Katha Recitation", description: "Reading the 5 chapters of Satyanarayan Katha." },
                { step: 4, title: "Havan", description: "Fire ritual for purification." },
                { step: 5, title: "Aarti & Prasad", description: "Concluding prayers and distribution of Sheera/Prasad." }
            ],
            features: ["Experienced Pandit", "All Samagri Provided", "Customizable for Home/Office", "Prasad Distribution"]
        },
        howItWorks: {
            steps: [
                { icon: "📅", title: "Schedule", description: "Choose a Purnima or Ekadashi date." },
                { icon: "🛒", title: "Book", description: "Book the puja online." },
                { icon: "✨", title: "Experience", description: "Participate in the divine Katha." }
            ]
        },
        benefits: {
            title: "Divine Benefits",
            cards: [
                { icon: "🕊️", title: "Peace", description: "Brings immense peace to the household." },
                { icon: "💰", title: "Prosperity", description: "Removes financial hurdles." },
                { icon: "❤️", title: "Unity", description: "Unites family members in prayer." },
                { icon: "🌟", title: "Positivity", description: "Clears negative energy from the premises." }
            ]
        },
        timing: {
            title: "Best Time to Perform",
            occasions: ["Purnima (Full Moon)", "Ekadashi", "Sankranti", "Thursdays"],
            muhurat: "Evening times are generally considered very auspicious."
        },
        testimonials: {
            reviews: [
                { name: "Anjali Gupta", location: "Bangalore", comment: "A beautiful ceremony for our new apartment. The Pandit ji explained everything so well.", rating: 5, avatar: "AG" },
                { name: "Suresh Reddy", location: "Hyderabad", comment: "Performed for my daughter's exam success. Felt very peaceful.", rating: 5, avatar: "SR" }
            ]
        },
        faq: {
            items: [
                { question: "Is fasting required?", answer: "It is traditional to fast until the puja is over, but not mandatory for everyone, especially elderly or sick." },
                { question: "How long does it take?", answer: "Usually 1.5 to 2 hours." },
                { question: "Can we do it in the evening?", answer: "Yes, evening is a very common and auspicious time for this puja." },
                { question: "Do you bring the photos?", answer: "Yes, we bring the deity photos and all necessary items." }
            ]
        }
    },
    {
        id: "ganesh-pooja",
        slug: "ganesh-pooja",
        name: "Ganesh Puja",
        tagline: "Remove Obstacles & Ensure Success in All Ventures",
        heroImage: "https://images.unsplash.com/photo-1567591414240-e7924e44f493?q=80&w=1000&auto=format&fit=crop",
        themeColor: "saffron",
        heroBenefits: [
            "Removal of all obstacles (Vighnaharta)",
            "Blessings for new business or job",
            "Wisdom and intellect growth"
        ],
        about: {
            title: "What is Ganesh Puja?",
            description: "Ganesh Puja involves the worship of Lord Ganesha, the remover of obstacles. It is the first ritual performed before any auspicious beginning.",
            significance: "Invoking Lord Ganesha ensures a smooth path to success, removing hurdles and bestowing wisdom.",
            whoShouldPerform: "Anyone starting a new business, buying a vehicle/property, or facing constant hurdles in life."
        },
        whyPerform: {
            title: "Why Perform this Puja?",
            reasons: [
                { icon: "🚧", title: "Remove Obstacles", description: "Clear path for success in personal and professional life." },
                { icon: "💼", title: "New Venture", description: "Essential before starting a business or new job." },
                { icon: "🧠", title: "Wisdom", description: "Enhances intellect and decision-making power." },
                { icon: "🕉️", title: "Divine Grace", description: "Seek initiation and blessings from the first-worshipped deity." }
            ]
        },
        process: {
            title: "Our Authentic Ritual Process",
            steps: [
                { step: 1, title: "Avahana", description: "Invoking Lord Ganesha into the idol or Kalash." },
                { step: 2, title: "Prana Pratishtha", description: "Infusing life energy into the idol with mantras." },
                { step: 3, title: "Shodashopachara", description: "16-step elaborate worship with flowers, durva, and modak." },
                { step: 4, title: "Maha Aarti", description: "Waving of lights and singing praises." },
                { step: 5, title: "Visarjan Utthaapan", description: "Concluding prayers." }
            ],
            features: ["Vedic Ganpati Atharvashirsha Chanting", "Durva Grass Offering", "Modak Prasad", "Live Sankalp"]
        },
        howItWorks: {
            steps: [
                { icon: "🗓️", title: "Book", description: "Select date (Ganesh Chaturthi/Sankashti are best)." },
                { icon: "📿", title: "Participate", description: "Join live or provide details for remote puja." },
                { icon: "🎁", title: "Receive", description: "Get the energized idol and prasad at home." }
            ]
        },
        benefits: {
            title: "Key Benefits",
            cards: [
                { icon: "🔓", title: "Unblocked Path", description: "Dissolves hurdles in career and life." },
                { icon: "💡", title: "Clarity", description: "Brings mental clarity and reduces confusion." },
                { icon: "💰", title: "Prosperity", description: "Attracts good fortune and wealth." },
                { icon: "🏠", title: "Harmony", description: "Removes Vastu doshas from the home." }
            ]
        },
        timing: {
            title: "Best Time to Perform",
            occasions: ["Ganesh Chaturthi", "Sankashti Chaturthi", "Wednesdays", "Before any new beginning"],
            muhurat: "Any Wednesday or during Brahma Muhurat."
        },
        testimonials: {
            reviews: [
                { name: "Rohit K.", location: "Pune", comment: "Started my startup after this puja. Things have been moving very smoothly since.", rating: 5, avatar: "RK" },
                { name: "Meera S.", location: "USA", comment: "Distance didn't matter. The vibes were amazing through the video call.", rating: 5, avatar: "MS" }
            ]
        },
        faq: {
            items: [
                { question: "Can we do this simply?", answer: "Yes, the scale can vary, but the devotion is what matters most." },
                { question: "What is Durva grass?", answer: "It is a sacred grass dear to Lord Ganesha, essential for the puja." },
                { question: "Is modak necessary?", answer: "It is Lord Ganesha's favorite sweet, so it is highly recommended as an offering." },
                { question: "Can I do it on my birthday?", answer: "Absolutely, it is a great way to start a new year of your life." }
            ]
        }
    },
    {
        id: "rudra-abhishek",
        slug: "rudra-abhishek",
        name: "Rudra Abhishek",
        tagline: "Experience the Healing Power of Lord Shiva",
        heroImage: "https://tse2.mm.bing.net/th?id=OIP.F_ZqXm05K7O4S7y7Z-fXvAHaE8&pid=Api",
        themeColor: "blue",
        heroBenefits: [
            "Destroys negative karma",
            "Promotes health and longevity",
            "Inner peace and spiritual growth"
        ],
        about: {
            title: "What is Rudra Abhishek?",
            description: "Rudra Abhishek is the ritual bathing of the Shiva Linga with sacred items like milk, honey, ghee, and water while chanting the Rudri Path.",
            significance: "It is considered one of the most effective ways to please Lord Shiva to remove tough obstacles and health issues.",
            whoShouldPerform: "People suffering from chronic health issues, depression, or fear. Also for those seeking spiritual upliftment."
        },
        whyPerform: {
            title: "Why Perform this Puja?",
            reasons: [
                { icon: "⚕️", title: "Health", description: "Powerful for overcoming long-standing illnesses." },
                { icon: "🛡️", title: "Protection", description: "Shields against negative energies and enemies." },
                { icon: "🌧️", title: "Abundance", description: "Fulfills desires and brings rain/prosperity." },
                { icon: "🧘", title: "Inner Peace", description: "Calms the mind and aids meditation." }
            ]
        },
        process: {
            title: "Our Authentic Ritual Process",
            steps: [
                { step: 1, title: "Sankalp", description: "Taking a vow for the specific purpose of the puja." },
                { step: 2, title: "Ganesh Puja", description: "Initial prayers to Lord Ganesha." },
                { step: 3, title: "Kalash Sthapana", description: "Establishing the pot representing the universe." },
                { step: 4, title: "Abhishek", description: "Continuous pouring of offerings on Shivling with Rudri Path." },
                { step: 5, title: "Bilva Patra Archana", description: "Offering sacred Bilva leaves." }
            ],
            features: ["11 Avartans of Rudri", "Pure Cows Milk & Ghee", "Bilva Patra from Kashi", "Mahaprasad"]
        },
        howItWorks: {
            steps: [
                { icon: "🕉️", title: "Book", description: "Choose a Monday or Pradosh." },
                { icon: "🕯️", title: "Observe", description: "Watch the mesmerizing abhishek live." },
                { icon: "🥛", title: "Blessings", description: "Receive the charnamrit and blessings." }
            ]
        },
        benefits: {
            title: "Key Benefits",
            cards: [
                { icon: "💪", title: "Vitality", description: "Rejuvenates mind and body." },
                { icon: "🌪️", title: "Karma Cleansing", description: "Washes away sins of past lives." },
                { icon: "🎯", title: "Focus", description: "Improves concentration and mental strength." },
                { icon: "☮️", title: "Harmony", description: "Brings peace to a troubled horoscope." }
            ]
        },
        timing: {
            title: "Best Time to Perform",
            occasions: ["Maha Shivratri", "Shravan Month", "Pradosh", "Mondays"],
            muhurat: "Any Monday or Shivratri night."
        },
        testimonials: {
            reviews: [
                { name: "Vikram Singh", location: "Delhi", comment: "The Rudri Path chanting was so powerful, I felt vibrations at home.", rating: 5, avatar: "VS" },
                { name: "Sarah J.", location: "UK", comment: "A truly divine experience. Highly recommend Mantra Puja.", rating: 5, avatar: "SJ" }
            ]
        },
        faq: {
            items: [
                { question: "What items are used for Abhishek?", answer: "Milk, Curd, Honey, Ghee, Sugar, Sugarcane juice, and Ganga Jal." },
                { question: "How long does it take?", answer: "A standard Rudra Abhishek takes about 1.5 - 2 hours." },
                { question: "Can women perform this?", answer: "Yes, women can perform or participate in the puja." },
                { question: "Is fasting needed?", answer: "It is good to fast or eat light satvik food on the day of the puja." }
            ]
        }
    },
    {
        id: "griha-pravesh",
        slug: "griha-pravesh",
        name: "Griha Pravesh Puja",
        tagline: "Bless Your New Home with Positivity & Prosperity",
        heroImage: "https://tse4.mm.bing.net/th?id=OIP.8QfCj-hO4g2YyY1aZ1zKxAHaE8&pid=Api",
        themeColor: "emerald",
        heroBenefits: [
            "Purify the new space",
            "Remove Vastu Doshas",
            "Invite wealth and happiness"
        ],
        about: {
            title: "What is Griha Pravesh?",
            description: "Griha Pravesh is a Hindu ceremony performed on the occasion of an individual's first entry into their new home. It purifies the environment and protects the house from negative energies.",
            significance: "Ensures the new living space is spiritually cleansed and ready to support the health and prosperity of its residents.",
            whoShouldPerform: "Anyone moving into a newly constructed or purchased home (owned or rented)."
        },
        whyPerform: {
            title: "Why Perform this Puja?",
            reasons: [
                { icon: "🧹", title: "Purification", description: "Cleanses the space of construction impurities and negative vibes." },
                { icon: "🏡", title: "Vastu Shanti", description: "Corrects minor Vastu faults in the structure." },
                { icon: "💰", title: "Prosperity", description: "Invites Goddess Lakshmi for financial stability." },
                { icon: "🛡️", title: "Protection", description: "Protects the family from evil eyes and misfortune." }
            ]
        },
        process: {
            title: "Our Authentic Ritual Process",
            steps: [
                { step: 1, title: "Dwar Puja", description: "Worship at the entrance/threshold of the house." },
                { step: 2, title: "Gau Puja", description: "Cow worship (symbolic or actual) for auspiciousness." },
                { step: 3, title: "Kitchen Puja", description: "Boiling milk to symbolize abundance." },
                { step: 4, title: "Navagraha & Vastu Havan", description: "Fire ritual to pacify planets and directions." },
                { step: 5, title: "Purnahuti", description: "Final offering and distribution of feast/prasad." }
            ],
            features: ["Vastu Shanti included", "Detailed Paddhati", "Samagri tailored to house size", "Vastu Consultation"]
        },
        howItWorks: {
            steps: [
                { icon: "📅", title: "Select Muhurat", description: "We help you find the best date and time." },
                { icon: "🏠", title: "Prepare House", description: "Clean the house and decorate the entrance." },
                { icon: "🔥", title: "Perform Puja", description: "Our Pandits conduct the full ceremony at your place." }
            ]
        },
        benefits: {
            title: "Key Benefits",
            cards: [
                { icon: "✨", title: "Positive Vibes", description: "Fills the home with divine energy." },
                { icon: "👨‍👩‍👦", title: "Family Harmony", description: "Promotes love and understanding among family members." },
                { icon: "🛡️", title: "Safety", description: "Divine protection for the physical structure and residents." },
                { icon: "🌱", title: "New Beginning", description: "A fresh, auspicious start for your life chapter." }
            ]
        },
        timing: {
            title: "Best Time to Perform",
            occasions: ["Vasant Panchami", "Akshaya Tritiya", "Dussehra", "Diwali"],
            muhurat: "Specific auspicious dates based on lunar calendar and nakshatras."
        },
        testimonials: {
            reviews: [
                { name: "Nisha & Raj", location: "Bangalore", comment: "The pandits were very punctual and guided us through every step. Felt great.", rating: 5, avatar: "NR" },
                { name: "Alok Gupta", location: "Hyderabad", comment: "Very comprehensive puja. They even did the Vastu Shanti properly.", rating: 4.5, avatar: "AG" }
            ]
        },
        faq: {
            items: [
                { question: "Can we do it after shifting?", answer: "Ideally, it should be done before shifting furniture or sleeping in the new house." },
                { question: "Is boiling milk necessary?", answer: "Yes, allowing milk to boil over symbolizes the overflow of wealth and happiness." },
                { question: "How many pandits are needed?", answer: "Usually 2-3 pandits are recommended for a complete setup including Havan." },
                { question: "Do you serve rented hours?", answer: "Yes, a simplified version is available for rented apartments." }
            ]
        }
    },
    {
        id: "mahamrityunjaya-jaap",
        slug: "mahamrityunjaya-jaap",
        name: "Mahamrityunjaya Jaap",
        tagline: "Conquer Fear & Death with the Great Mantra",
        heroImage: "https://www.rudraksha-ratna.com/uploads/files/5462565651.jpg",
        themeColor: "purple",
        heroBenefits: [
            "Lifesaving protection",
            "Recovery from critical illness",
            "Mental strength and fearlessness"
        ],
        about: {
            title: "What is Mahamrityunjaya Jaap?",
            description: "This is a powerful jaap dedicated to Lord Shiva, known as the 'Great Death-Conquering Mantra'. It is recited for longevity and warding off untimely death.",
            significance: "It creates a powerful vibration that heals the body and mind, acting as a shield against accidents and serious diseases.",
            whoShouldPerform: "Those facing severe health crisis, fear of death, accidents, or running a bad Markesh dasha."
        },
        whyPerform: {
            title: "Why Perform this Puja?",
            reasons: [
                { icon: "⚕️", title: "Healing", description: "Accelerates recovery from surgery or long-term illness." },
                { icon: "🛡️", title: "Protection", description: "Guards against accidents and sudden calamities." },
                { icon: "🧠", title: "Mental Health", description: "Cures anxiety, depression, and phobias." },
                { icon: "🎂", title: "Longevity", description: "Blesses the devotee with a long and healthy life." }
            ]
        },
        process: {
            title: "Our Authentic Ritual Process",
            steps: [
                { step: 1, title: "Sankalp", description: "Vow taken for the specific person's health/life." },
                { step: 2, title: "Ganesh & Shiva Puja", description: "Worship of the deities." },
                { step: 3, title: "Mantra Japa", description: "Repetitive chanting of the mantra (11k, 21k, 51k, or 125k times)." },
                { step: 4, title: "Havan", description: "Offering oblations with mantra into the fire." },
                { step: 5, title: "Abhishek", description: "Final bathing of Shivling." }
            ],
            features: ["Multiple Brahmins (Pandits)", "Strict counting of Mantras", "Samputith path options", "Live Audio Feed"]
        },
        howItWorks: {
            steps: [
                { icon: "🔢", title: "Choose Count", description: "Select 21k, 51k or 1.25 Lakh chants." },
                { icon: "📅", title: "Schedule", description: "The jaap can span multiple days." },
                { icon: "🙏", title: "Pray", description: "Devotee should try to meditate during the jaap time." }
            ]
        },
        benefits: {
            title: "Key Benefits",
            cards: [
                { icon: "🧬", title: "Revival", description: "Brings back vitality to a dying person." },
                { icon: "🧘", title: "Calm", description: "Instills deep inner silence and peace." },
                { icon: "🔮", title: "Future Safety", description: "Mitigates future risks in the horoscope." },
                { icon: "👪", title: "Family Protection", description: "Protects the entire lineage." }
            ]
        },
        timing: {
            title: "Best Time to Perform",
            occasions: ["Maha Shivratri", "Mondays", "During illness", "Birthday"],
            muhurat: "Ideally started on a Monday."
        },
        testimonials: {
            reviews: [
                { name: "Sunita M.", location: "Chennai", comment: "We performed this for my father in ICU. He showed miraculous recovery.", rating: 5, avatar: "SM" },
                { name: "James D.", location: "USA", comment: "Very powerful chanting. Felt a shift in energy immediately.", rating: 5, avatar: "JD" }
            ]
        },
        faq: {
            items: [
                { question: "How many chants are recommended?", answer: "For critical issues, 1.25 Lakh (Sawa Lakh) is recommended. For general wellness, 11,000 is good." },
                { question: "Can I listen to a recording?", answer: "Listening helps, but a ritualistic Jap by Brahmins generates the specific active energy needed." },
                { question: "Does the person need to be present?", answer: "No, Sankalp can be taken on their behalf." },
                { question: "What is the mantra?", answer: "Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam Urvarukamiva Bandhanan Mrityor Mukshiya Mamritat." }
            ]
        }
    },
    {
        id: "navagraha-shanti",
        slug: "navagraha-shanti",
        name: "Navagraha Shanti Puja",
        tagline: "Harmonize the 9 Planetary Forces in Your Life",
        heroImage: "https://www.askganesha.com/uploads/rem-services/navgrah-shanti-puja.jpg",
        themeColor: "slate",
        heroBenefits: [
            "Balance planetary influences",
            "Remove bad luck & obstacles",
            "Success in career & life"
        ],
        about: {
            title: "What is Navagraha Shanti?",
            description: "Navagraha Shanti is a combined puja for all the nine planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu). It aims to reduce the negative effects and enhance the positive ones.",
            significance: "Planets influence our destiny. Balancing them ensures that our efforts yield the best results without unforeseen hindrances.",
            whoShouldPerform: "Anyone going through a rough patch, facing multiple failures, or running a difficult Dasha/Antardasha."
        },
        whyPerform: {
            title: "Why Perform this Puja?",
            reasons: [
                { icon: "⚖️", title: "Balance", description: "Pacifies malefic planets and strengthens benefic ones." },
                { icon: "🚧", title: "Remove Hurdles", description: "Clear unexplained obstacles in life path." },
                { icon: "💼", title: "Career/Business", description: "Good for stability and growth in profession." },
                { icon: "❤️", title: "Relationships", description: "Improves harmony and reduces conflicts." }
            ]
        },
        process: {
            title: "Our Authentic Ritual Process",
            steps: [
                { step: 1, title: "Graha Avahana", description: "Invoking all 9 deities into the Mandal." },
                { step: 2, title: "Navagraha Mantra Jaap", description: "Chanting specific mantras for each planet." },
                { step: 3, title: "Havan", description: "Offering special herbs (Samidha) for each planet into the fire." },
                { step: 4, title: "Purnahuti", description: "Final offering." },
                { step: 5, title: "Dan-Dakshina", description: "Donating items related to planets to seek forgiveness." }
            ],
            features: ["9 Planet Mandala Setup", "Specific Samidha for Havan", "Expert Astrologer Guidance", "Live Stream"]
        },
        howItWorks: {
            steps: [
                { icon: "🔮", title: "Analysis", description: "Optional horoscope check to see which planets need attention." },
                { icon: "🔥", title: "Puja", description: "Performance of the rigorous rituals." },
                { icon: "🎁", title: "Remedies", description: "Receive Navagraha Yantra or items to keep." }
            ]
        },
        benefits: {
            title: "Key Benefits",
            cards: [
                { icon: "🌟", title: "Good Luck", description: "Turns the tide of luck in your favor." },
                { icon: "💪", title: "Confidence", description: "Boosts mental strength and decision making." },
                { icon: "🛡️", title: "Protection", description: "Shields against sudden accidents or losses." },
                { icon: "😌", title: "Peace", description: "Reduces mental stress and anxiety." }
            ]
        },
        timing: {
            title: "Best Time to Perform",
            occasions: ["New Year", "Birthday", "Start of new Dasha", "Solar/Lunar Eclipse"],
            muhurat: "Any auspicious day as per Panchang."
        },
        testimonials: {
            reviews: [
                { name: "Karan Johar", location: "Mumbai", comment: "Felt a lot lighter and things started moving in my favor after this puja.", rating: 4.5, avatar: "KJ" },
                { name: "Alice W.", location: "Sydney", comment: "The explanation provided by the pandit was very insightful.", rating: 5, avatar: "AW" }
            ]
        },
        faq: {
            items: [
                { question: "Is it for one planet or all 9?", answer: "This specific puja covers all 9 planets to ensure overall balance." },
                { question: "Do I need to give charity?", answer: "Yes, donating specific grains/clothes (Dan) is a crucial part of pacifying planets." },
                { question: "How often should it be done?", answer: "Once a year is good for general maintenance of planetary energies." },
                { question: "Can it cure diseases?", answer: "It supports medical treatment by removing planetary obstructions to healing." }
            ]
        }
    }
];

export function getPujaBySlug(slug: string): PujaData | undefined {
    return pujas.find(p => p.slug === slug);
}
