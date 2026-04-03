const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const staticLocations = [
    { id: 1, name: "Badrinath", slug: "badrinath", type: "Char Dham", description: "North - Vishnu Temple (Uttarakhand)", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80", stateId: 'ut', x: 228, y: 176, size: 'large' },
    { id: 2, name: "Dwarka", slug: "dwarka", type: "Char Dham", description: "West - Krishna Temple (Gujarat)", image: "https://images.unsplash.com/photo-1590050752117-23aae33aa2b1?auto=format&fit=crop&w=800&q=80", stateId: 'gj', x: 68, y: 351, size: 'large' },
    { id: 3, name: "Puri", slug: "puri", type: "Char Dham", description: "East - Jagannath Temple (Odisha)", image: "https://images.unsplash.com/photo-1601058498305-649033333333?auto=format&fit=crop&w=800&q=80", stateId: 'or', x: 332, y: 405, size: 'large' },
    { id: 4, name: "Rameswaram", slug: "rameswaram", type: "Char Dham", description: "South - Shiva Temple (Tamil Nadu)", image: "https://images.unsplash.com/photo-1582510003544-4d041c2c3666?auto=format&fit=crop&w=800&q=80", stateId: 'tn', x: 211, y: 600, size: 'large' },
    { id: 5, name: "Somnath", slug: "somnath", type: "Jyotirlinga", description: "Gujarat", image: "https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=800&q=80", stateId: 'gj', x: 92, y: 351, size: 'medium' },
    { id: 6, name: "Kedarnath", slug: "kedarnath", type: "Jyotirlinga", description: "Uttarakhand", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80", stateId: 'ut', x: 252, y: 176, size: 'medium' },
    { id: 7, name: "Omkareshwar", slug: "omkareshwar", type: "Jyotirlinga", description: "Madhya Pradesh", image: "https://images.unsplash.com/photo-1627838565034-7a915264b360?auto=format&fit=crop&w=800&q=80", stateId: 'mp', x: 213, y: 314, size: 'small' },
    { id: 8, name: "Mahakaleshwar (Ujjain)", slug: "mahakaleshwar", type: "Jyotirlinga", description: "Madhya Pradesh", image: "https://images.unsplash.com/photo-1621251346618-1c44866f81e3?auto=format&fit=crop&w=800&q=80", stateId: 'mp', x: 237, y: 314, size: 'medium' },
    { id: 9, name: "Kashi Vishwanath (Varanasi)", slug: "kashi-vishwanath", type: "Jyotirlinga", description: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1561488132-34304859a016?auto=format&fit=crop&w=800&q=80", stateId: 'up', x: 250, y: 263, size: 'medium' },
    { id: 10, name: "Baidyanath (Deoghar)", slug: "baidyanath", type: "Jyotirlinga", description: "Jharkhand", image: "https://images.unsplash.com/photo-1542332213-31f8714e79c1?auto=format&fit=crop&w=800&q=80", stateId: 'jh', x: 371, y: 327, size: 'medium' },
    { id: 11, name: "Trimbakeshwar (Nashik)", slug: "trimbakeshwar", type: "Jyotirlinga", description: "Maharashtra", image: "https://images.unsplash.com/photo-1634927299002-ec5756385207?auto=format&fit=crop&w=800&q=80", stateId: 'mh', x: 168, y: 427, size: 'small' },
    { id: 12, name: "Grishneshwar (Aurangabad)", slug: "grishneshwar", type: "Jyotirlinga", description: "Maharashtra", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80", stateId: 'mh', x: 192, y: 427, size: 'small' },
    { id: 13, name: "Bhimashankar", slug: "bhimashankar", type: "Jyotirlinga", description: "Maharashtra", image: "https://images.unsplash.com/photo-1560611422-0d3eed073a90?auto=format&fit=crop&w=800&q=80", stateId: 'mh', x: 180, y: 448, size: 'small' },
    { id: 14, name: "Nageshwar (Dwarka)", slug: "nageshwar", type: "Jyotirlinga", description: "Gujarat", image: "https://images.unsplash.com/photo-1590050752117-23aae33aa2b1?auto=format&fit=crop&w=800&q=80", stateId: 'gj', x: 80, y: 372, size: 'small' },
    { id: 15, name: "Rameswaram Jyotirlinga", slug: "rameswaram-jyotirlinga", type: "Jyotirlinga", description: "Tamil Nadu", image: "https://images.unsplash.com/photo-1582510003544-4d041c2c3666?auto=format&fit=crop&w=800&q=80", stateId: 'tn', x: 235, y: 600, size: 'small' },
    { id: 16, name: "Mallikarjuna (Srisailam)", slug: "mallikarjuna", type: "Jyotirlinga", description: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1621251346618-1c44866f81e3?auto=format&fit=crop&w=800&q=80", stateId: 'ap', x: 248, y: 504, size: 'medium' },
    { id: 17, name: "Prayagraj", slug: "prayagraj", type: "Kumbh Mela", description: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1596791999908-011400272c72?auto=format&fit=crop&w=800&q=80", stateId: 'up', x: 274, y: 263, size: 'large' },
    { id: 18, name: "Haridwar", slug: "haridwar", type: "Kumbh Mela", description: "Uttarakhand", image: "https://images.unsplash.com/photo-1542332213-31f8714e79c1?auto=format&fit=crop&w=800&q=80", stateId: 'ut', x: 240, y: 197, size: 'large' },
    { id: 19, name: "Nashik", slug: "nashik", type: "Kumbh Mela", description: "Maharashtra", image: "https://images.unsplash.com/photo-1634927299002-ec5756385207?auto=format&fit=crop&w=800&q=80", stateId: 'mh', x: 156, y: 448, size: 'large' },
    { id: 20, name: "Ujjain", slug: "ujjain", type: "Kumbh Mela", description: "Madhya Pradesh", image: "https://images.unsplash.com/photo-1621251346618-1c44866f81e3?auto=format&fit=crop&w=800&q=80", stateId: 'mp', x: 225, y: 335, size: 'large' },
    { id: 21, name: "Kolkata (Kalighat)", slug: "kolkata-kalighat", type: "Shakti Peeth", description: "West Bengal", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'wb', x: 423, y: 329, size: 'small' },
    { id: 22, name: "Guwahati (Kamakhya)", slug: "guwahati-kamakhya", type: "Shakti Peeth", description: "Assam", image: "https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=800&q=80", stateId: 'as', x: 509, y: 271, size: 'small' },
    { id: 23, name: "Agartala", slug: "agartala", type: "Shakti Peeth", description: "Tripura", image: "https://images.unsplash.com/photo-1542332213-31f8714e79c1?auto=format&fit=crop&w=800&q=80", stateId: 'tr', x: 493, y: 324, size: 'small' },
    { id: 24, name: "Shillong", slug: "shillong", type: "Shakti Peeth", description: "Meghalaya", image: "https://images.unsplash.com/photo-1560611422-0d3eed073a90?auto=format&fit=crop&w=800&q=80", stateId: 'ml', x: 487, y: 281, size: 'small' },
    { id: 25, name: "Gangtok", slug: "gangtok", type: "Shakti Peeth", description: "Sikkim", image: "https://images.unsplash.com/photo-1582510003544-4d041c2c3666?auto=format&fit=crop&w=800&q=80", stateId: 'sk', x: 424, y: 236, size: 'small' },
    { id: 26, name: "Imphal", slug: "imphal", type: "Shakti Peeth", description: "Manipur", image: "https://images.unsplash.com/photo-1590050752117-23aae33aa2b1?auto=format&fit=crop&w=800&q=80", stateId: 'mn', x: 536, y: 301, size: 'small' },
    { id: 27, name: "Kohima", slug: "kohima", type: "Shakti Peeth", description: "Nagaland", image: "https://images.unsplash.com/photo-1561488132-34304859a016?auto=format&fit=crop&w=800&q=80", stateId: 'nl', x: 548, y: 273, size: 'small' },
    { id: 28, name: "Aizawl", slug: "aizawl", type: "Shakti Peeth", description: "Mizoram", image: "https://images.unsplash.com/photo-1627838565034-7a915264b360?auto=format&fit=crop&w=800&q=80", stateId: 'mz', x: 516, y: 335, size: 'small' },
    { id: 29, name: "Port Blair", slug: "port-blair", type: "Shakti Peeth", description: "Andaman & Nicobar", image: "https://images.unsplash.com/photo-1582510003544-4d041c2c3666?auto=format&fit=crop&w=800&q=80", stateId: 'an', x: 520, y: 602, size: 'small' },
    { id: 30, name: "Jammu (Vaishno Devi)", slug: "vaishno-devi", type: "Shakti Peeth", description: "Jammu & Kashmir", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80", stateId: 'jk', x: 176, y: 72, size: 'small' },
    { id: 31, name: "Srinagar", slug: "srinagar", type: "Shakti Peeth", description: "Jammu & Kashmir", image: "https://images.unsplash.com/photo-1632766329871-0490d1921356?auto=format&fit=crop&w=800&q=80", stateId: 'jk', x: 200, y: 72, size: 'small' },
    { id: 32, name: "Leh", slug: "leh", type: "Shakti Peeth", description: "Ladakh", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80", stateId: 'jk', x: 188, y: 93, size: 'small' },
    { id: 33, name: "Kangra (Jwalaji)", slug: "kangra", type: "Shakti Peeth", description: "Himachal Pradesh", image: "https://images.unsplash.com/photo-1621251346618-1c44866f81e3?auto=format&fit=crop&w=800&q=80", stateId: 'hp', x: 193, y: 135, size: 'small' },
    { id: 34, name: "Shimla", slug: "shimla", type: "Shakti Peeth", description: "Himachal Pradesh", image: "https://images.unsplash.com/photo-1627838565034-7a915264b360?auto=format&fit=crop&w=800&q=80", stateId: 'hp', x: 217, y: 135, size: 'small' },
    { id: 35, name: "Amritsar", slug: "amritsar", type: "Shakti Peeth", description: "Punjab", image: "https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=800&q=80", stateId: 'pb', x: 155, y: 158, size: 'small' },
    { id: 36, name: "Prayagraj (Alopi Devi)", slug: "prayagraj-alopi-devi", type: "Shakti Peeth", description: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1596791999908-011400272c72?auto=format&fit=crop&w=800&q=80", stateId: 'up', x: 262, y: 284, size: 'small' },
    { id: 37, name: "Varanasi (Vishalakshi)", slug: "varanasi-vishalakshi", type: "Shakti Peeth", description: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1561488132-34304859a016?auto=format&fit=crop&w=800&q=80", stateId: 'up', x: 238, y: 284, size: 'small' },
    { id: 38, name: "Vindhyachal", slug: "vindhyachal", type: "Shakti Peeth", description: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1542332213-31f8714e79c1?auto=format&fit=crop&w=800&q=80", stateId: 'up', x: 226, y: 263, size: 'small' },
    { id: 39, name: "Gaya", slug: "gaya", type: "Shakti Peeth", description: "Bihar", image: "https://images.unsplash.com/photo-1621251346618-1c44866f81e3?auto=format&fit=crop&w=800&q=80", stateId: 'br', x: 366, y: 279, size: 'small' },
    { id: 40, name: "Patna", slug: "patna", type: "Shakti Peeth", description: "Bihar", image: "https://images.unsplash.com/photo-1596791999908-011400272c72?auto=format&fit=crop&w=800&q=80", stateId: 'br', x: 390, y: 279, size: 'small' },
    { id: 41, name: "Rajgir", slug: "rajgir", type: "Shakti Peeth", description: "Bihar", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80", stateId: 'br', x: 378, y: 299, size: 'small' },
    { id: 42, name: "Ujjain (Shakti)", slug: "ujjain-shakti", type: "Shakti Peeth", description: "Madhya Pradesh", image: "https://images.unsplash.com/photo-1621251346618-1c44866f81e3?auto=format&fit=crop&w=800&q=80", stateId: 'mp', x: 201, y: 335, size: 'small' },
    { id: 43, name: "Jabalpur", slug: "jabalpur", type: "Shakti Peeth", description: "Madhya Pradesh", image: "https://images.unsplash.com/photo-1627838565034-7a915264b360?auto=format&fit=crop&w=800&q=80", stateId: 'mp', x: 189, y: 314, size: 'small' },
    { id: 44, name: "Jaipur", slug: "jaipur", type: "Shakti Peeth", description: "Rajasthan", image: "https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=800&q=80", stateId: 'rj', x: 148, y: 275, size: 'small' },
    { id: 45, name: "Jodhpur", slug: "jodhpur", type: "Shakti Peeth", description: "Rajasthan", image: "https://images.unsplash.com/photo-1596791999908-011400272c72?auto=format&fit=crop&w=800&q=80", stateId: 'rj', x: 172, y: 275, size: 'small' },
    { id: 46, name: "Udaipur", slug: "udaipur", type: "Shakti Peeth", description: "Rajasthan", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80", stateId: 'rj', x: 160, y: 296, size: 'small' },
    { id: 47, name: "Chittorgarh", slug: "chittorgarh", type: "Shakti Peeth", description: "Rajasthan", image: "https://images.unsplash.com/photo-1621251346618-1c44866f81e3?auto=format&fit=crop&w=800&q=80", stateId: 'rj', x: 136, y: 296, size: 'small' },
    { id: 48, name: "Nashik (Shakti)", slug: "nashik-shakti", type: "Shakti Peeth", description: "Maharashtra", image: "https://images.unsplash.com/photo-1634927299002-ec5756385207?auto=format&fit=crop&w=800&q=80", stateId: 'mh', x: 144, y: 427, size: 'small' },
    { id: 49, name: "Mumbai (Mumbadevi)", slug: "mumbai-mumbadevi", type: "Shakti Peeth", description: "Maharashtra", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80", stateId: 'mh', x: 156, y: 406, size: 'small' },
    { id: 50, name: "Kolhapur", slug: "kolhapur", type: "Shakti Peeth", description: "Maharashtra", image: "https://images.unsplash.com/photo-1560611422-0d3eed073a90?auto=format&fit=crop&w=800&q=80", stateId: 'mh', x: 181, y: 405, size: 'small' },
    { id: 51, name: "Tuljapur", slug: "tuljapur", type: "Shakti Peeth", description: "Maharashtra", image: "https://images.unsplash.com/photo-1634927299002-ec5756385207?auto=format&fit=crop&w=800&q=80", stateId: 'mh', x: 204, y: 448, size: 'small' },
    { id: 52, name: "Amravati", slug: "amravati", type: "Shakti Peeth", description: "Maharashtra", image: "https://images.unsplash.com/photo-1542332213-31f8714e79c1?auto=format&fit=crop&w=800&q=80", stateId: 'mh', x: 168, y: 469, size: 'small' },
    { id: 53, name: "Puri (Shakti)", slug: "puri-shakti", type: "Shakti Peeth", description: "Odisha", image: "https://images.unsplash.com/photo-1601058498305-649033333333?auto=format&fit=crop&w=800&q=80", stateId: 'or', x: 356, y: 405, size: 'small' },
    { id: 54, name: "Cuttack", slug: "cuttack", type: "Shakti Peeth", description: "Odisha", image: "https://images.unsplash.com/photo-1582510003544-4d041c2c3666?auto=format&fit=crop&w=800&q=80", stateId: 'or', x: 344, y: 426, size: 'small' },
    { id: 55, name: "Berhampur", slug: "berhampur", type: "Shakti Peeth", description: "Odisha", image: "https://images.unsplash.com/photo-1590050752117-23aae33aa2b1?auto=format&fit=crop&w=800&q=80", stateId: 'or', x: 320, y: 426, size: 'small' },
    { id: 56, name: "Hyderabad", slug: "hyderabad", type: "Shakti Peeth", description: "Telangana", image: "https://images.unsplash.com/photo-1561488132-34304859a016?auto=format&fit=crop&w=800&q=80", stateId: 'tg', x: 228, y: 458, size: 'small' },
    { id: 57, name: "Warangal", slug: "warangal", type: "Shakti Peeth", description: "Telangana", image: "https://images.unsplash.com/photo-1621251346618-1c44866f81e3?auto=format&fit=crop&w=800&q=80", stateId: 'tg', x: 226, y: 482, size: 'small' },
    { id: 58, name: "Vijayawada", slug: "vijayawada", type: "Shakti Peeth", description: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1627838565034-7a915264b360?auto=format&fit=crop&w=800&q=80", stateId: 'ap', x: 272, y: 504, size: 'small' },
    { id: 59, name: "Srikakulam", slug: "srikakulam", type: "Shakti Peeth", description: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=800&q=80", stateId: 'ap', x: 260, y: 525, size: 'small' },
    { id: 60, name: "Tirupati", slug: "tirupati", type: "Shakti Peeth", description: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1596791999908-011400272c72?auto=format&fit=crop&w=800&q=80", stateId: 'ap', x: 236, y: 525, size: 'small' },
    { id: 61, name: "Hampi", slug: "hampi", type: "Shakti Peeth", description: "Karnataka", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80", stateId: 'ka', x: 175, y: 517, size: 'small' },
    { id: 62, name: "Mangaluru", slug: "mangaluru", type: "Shakti Peeth", description: "Karnataka", image: "https://images.unsplash.com/photo-1621251346618-1c44866f81e3?auto=format&fit=crop&w=800&q=80", stateId: 'ka', x: 199, y: 517, size: 'small' },
    { id: 63, name: "Udupi", slug: "udupi", type: "Shakti Peeth", description: "Karnataka", image: "https://images.unsplash.com/photo-1627838565034-7a915264b360?auto=format&fit=crop&w=800&q=80", stateId: 'ka', x: 187, y: 538, size: 'small' },
    { id: 64, name: "Chennai", slug: "chennai", type: "Shakti Peeth", description: "Tamil Nadu", image: "https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=800&q=80", stateId: 'tn', x: 223, y: 621, size: 'small' },
    { id: 65, name: "Kanchipuram", slug: "kanchipuram", type: "Shakti Peeth", description: "Tamil Nadu", image: "https://images.unsplash.com/photo-1596791999908-011400272c72?auto=format&fit=crop&w=800&q=80", stateId: 'tn', x: 199, y: 621, size: 'small' },
    { id: 66, name: "Madurai", slug: "madurai", type: "Shakti Peeth", description: "Tamil Nadu", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80", stateId: 'tn', x: 187, y: 600, size: 'small' },
    { id: 67, name: "Rameswaram (Shakti)", slug: "rameswaram-shakti", type: "Shakti Peeth", description: "Tamil Nadu", image: "https://images.unsplash.com/photo-1582510003544-4d041c2c3666?auto=format&fit=crop&w=800&q=80", stateId: 'tn', x: 199, y: 579, size: 'small' },
    { id: 68, name: "Coimbatore", slug: "coimbatore", type: "Shakti Peeth", description: "Tamil Nadu", image: "https://images.unsplash.com/photo-1590050752117-23aae33aa2b1?auto=format&fit=crop&w=800&q=80", stateId: 'tn', x: 224, y: 578, size: 'small' },
    { id: 69, name: "Thiruvananthapuram", slug: "thiruvananthapuram", type: "Shakti Peeth", description: "Kerala", image: "https://images.unsplash.com/photo-1561488132-34304859a016?auto=format&fit=crop&w=800&q=80", stateId: 'kl', x: 169, y: 617, size: 'small' },
    { id: 70, name: "Kollam", slug: "kollam", type: "Shakti Peeth", description: "Kerala", image: "https://images.unsplash.com/photo-1542332213-31f8714e79c1?auto=format&fit=crop&w=800&q=80", stateId: 'kl', x: 156, y: 596, size: 'small' },
    { id: 71, name: "Thrissur", slug: "thrissur", type: "Shakti Peeth", description: "Kerala", image: "https://images.unsplash.com/photo-1560611422-0d3eed073a90?auto=format&fit=crop&w=800&q=80", stateId: 'kl', x: 179, y: 639, size: 'small' },
];

// Mapping toconfirmed OLD schema: ['id', 'name', 'slug', 'description', 'image_url', 'poojas_available', 'seo_title', 'seo_description', 'created_at', 'updated_at']
const oldSchemaMappedLocations = staticLocations.map(loc => ({
    name: loc.name,
    slug: loc.slug,
    description: loc.description,
    image_url: loc.image,
    poojas_available: [],
    seo_title: `${loc.name} - Sacred ${loc.type} Location`,
    seo_description: `Learn about the spiritual significance of ${loc.name}, a major ${loc.type} temple in ${loc.description}.`
}));

async function populate() {
    console.log('Populating locations (using existing table schema)...');
    const { data, error } = await supabase
        .from('locations')
        .upsert(oldSchemaMappedLocations, { onConflict: 'slug' });

    if (error) {
        console.error('Error populating locations:', error);
    } else {
        console.log(`Successfully populated ${oldSchemaMappedLocations.length} locations!`);
    }
}

populate();
