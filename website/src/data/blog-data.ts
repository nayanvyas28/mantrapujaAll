export type BlogCategory =
    | "All"
    | "Astrology & Predictions"
    | "Puja & Rituals"
    | "Sacred Places & Yatra"
    | "Devta & Divine Knowledge"
    | "Scriptures & Ancient Wisdom"
    | "Life Guidance & Problems"
    | "Devotional Culture";

export interface Author {
    name: string;
    avatar: string;
    role: string;
    socialLink?: string;
}

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    image_url: string;
    created_at: string;
    category: BlogCategory;
    tags: string[];
    views: number;
    author: Author;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
    "All",
    "Astrology & Predictions",
    "Puja & Rituals",
    "Sacred Places & Yatra",
    "Devta & Divine Knowledge",
    "Scriptures & Ancient Wisdom",
    "Life Guidance & Problems",
    "Devotional Culture"
];

export const MOCK_BLOGS: BlogPost[] = [
    {
        id: 1,
        title: "The Science Behind Vedic Mantras: How Sound Heals",
        excerpt: "Discover how ancient sound vibrations impact your mental and spiritual well-being. Mantras are more than just chants; they are precise sound formulas designed to elevate consciousness.",
        slug: "science-behind-vedic-mantras",
        image_url: "https://images.unsplash.com/photo-1605218453416-59e3c9c94494?q=80&w=600&auto=format&fit=crop",
        created_at: "2024-03-15T09:00:00Z",
        category: "Scriptures & Ancient Wisdom",
        tags: ["Vedic Science", "Mantras", "Wellness"],
        views: 1250,
        author: {
            name: "Dr. Aryan Sharma",
            avatar: "https://i.pravatar.cc/150?u=aryan",
            role: "Vedic Scholar",
            socialLink: "https://twitter.com/aryansharma"
        }
    },
    {
        id: 2,
        title: "Why Rudrabhishek is the Most Powerful Shiva Ritual",
        excerpt: "Understanding the significance of Lord Shiva's most potent ritual for peace and prosperity. Learn why this ancient practice is so effective for removing negativity.",
        slug: "power-of-rudrabhishek",
        image_url: "https://images.unsplash.com/photo-1542353436-312f0e1f67ff?q=80&w=600&auto=format&fit=crop",
        created_at: "2024-03-10T09:00:00Z",
        category: "Puja & Rituals",
        tags: ["Shiva", "Rituals", "Rudrabhishek"],
        views: 980,
        author: {
            name: "Pandit Ravi Shastri",
            avatar: "https://i.pravatar.cc/150?u=ravi",
            role: "Head Priest",
        }
    },
    {
        id: 3,
        title: "Saturn Transit 2024: What It Means for Your Zodiac",
        excerpt: "A complete guide to the movement of Shani Dev this year. Find out how it affects your career, health, and relationships based on your moon sign.",
        slug: "saturn-transit-2024",
        image_url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
        created_at: "2024-03-05T09:00:00Z",
        category: "Astrology & Predictions",
        tags: ["Astrology", "Saturn", "Predictions"],
        views: 3400,
        author: {
            name: "Acharya Meera",
            avatar: "https://i.pravatar.cc/150?u=meera",
            role: "Senior Astrologer",
        }
    },
    {
        id: 4,
        title: "Kashi Vishwanath Yatra: A Pilgrim's Guide",
        excerpt: "Plan your spiritual journey to the city of Moksha. Tips on darshan timings, nearby temples, and the spiritual significance of Varanasi.",
        slug: "kashi-vishwanath-yatra-guide",
        image_url: "https://images.unsplash.com/photo-1561361513-35e6e9b98634?q=80&w=600&auto=format&fit=crop",
        created_at: "2024-02-28T09:00:00Z",
        category: "Sacred Places & Yatra",
        tags: ["Travel", "Varanasi", "Shiva"],
        views: 2100,
        author: {
            name: "Rajesh Verma",
            avatar: "https://i.pravatar.cc/150?u=rajesh",
            role: "Travel Guide",
        }
    },
    {
        id: 5,
        title: "Understanding Kaal Sarp Dosh: Symptoms and Remedies",
        excerpt: "Is your life full of unexpected struggles? You might have Kaal Sarp Dosh. Learn about the different types and effective remedies.",
        slug: "kaal-sarp-dosh-remedies",
        image_url: "https://images.unsplash.com/photo-1621360841012-9860b7305942?q=80&w=600&auto=format&fit=crop",
        created_at: "2024-02-20T09:00:00Z",
        category: "Life Guidance & Problems",
        tags: ["Doshas", "Remedies", "Astrology"],
        views: 1850,
        author: {
            name: "Pandit Ravi Shastri",
            avatar: "https://i.pravatar.cc/150?u=ravi",
            role: "Head Priest",
        }
    },
    {
        id: 6,
        title: "The 9 Forms of Goddess Durga Explained",
        excerpt: "Navratri Special: Deep dive into the significance, color, and story behind each of the Navadurga forms worshiped during the festival.",
        slug: "navadurga-forms-explained",
        image_url: "https://images.unsplash.com/photo-1634914040989-13824ee1c9f4?q=80&w=600&auto=format&fit=crop",
        created_at: "2024-02-15T09:00:00Z",
        category: "Devta & Divine Knowledge",
        tags: ["Navratri", "Durga", "Devi"],
        views: 1540,
        author: {
            name: "Dr. Aryan Sharma",
            avatar: "https://i.pravatar.cc/150?u=aryan",
            role: "Vedic Scholar",
        }
    },
    {
        id: 7,
        title: "Char Dham Yatra: A Spiritual Journey to Salvation",
        excerpt: "Experience the divinity of Yamunotri, Gangotri, Kedarnath, and Badrinath. A comprehensive guide for pilgrims seeking moksha in the Himalayas.",
        slug: "char-dham-yatra-guide",
        image_url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600&auto=format&fit=crop",
        created_at: "2024-04-01T09:00:00Z",
        category: "Sacred Places & Yatra",
        tags: ["Char Dham", "Himalayas", "Pilgrimage"],
        views: 4500,
        author: {
            name: "Pandit Ravi Shastri",
            avatar: "https://i.pravatar.cc/150?u=ravi",
            role: "Head Priest",
        }
    },
    {
        id: 8,
        title: "The Mystical Energy of Ujjain Mahakaleshwar",
        excerpt: "Discover why Ujjain is considered the center of time and spiritual energy. Learn about the unique Bhasma Aarti and the power of Mahakal.",
        slug: "ujjain-mahakaleshwar-energy",
        image_url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80",
        created_at: "2024-04-05T09:00:00Z",
        category: "Sacred Places & Yatra",
        tags: ["Ujjain", "Shiva", "Jyotirlinga"],
        views: 3200,
        author: {
            name: "Acharya Meera",
            avatar: "https://i.pravatar.cc/150?u=meera",
            role: "Senior Astrologer",
        }
    },
    {
        id: 9,
        title: "Kedarnath: Standing Strong Through the Ages",
        excerpt: "The miraculous story of the Kedarnath temple and its spiritual significance. A guide to the most revered site in the Garhwal Himalayas.",
        slug: "kedarnath-spiritual-significance",
        image_url: "https://images.unsplash.com/photo-1626292305370-9856a64b5952?q=80&w=600&auto=format&fit=crop",
        created_at: "2024-04-10T09:00:00Z",
        category: "Sacred Places & Yatra",
        tags: ["Kedarnath", "Shiva", "Char Dham"],
        views: 5120,
        author: {
            name: "Dr. Aryan Sharma",
            avatar: "https://i.pravatar.cc/150?u=aryan",
            role: "Vedic Scholar",
        }
    }
];
