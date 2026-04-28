export type LocationType = 'Char Dham' | 'Jyotirlinga' | 'Shakti Peeth' | 'Kumbh Mela' | 'All';

export interface Location {
    id: number;
    name: string;
    slug: string;
    type: LocationType;
    description: string;
    image: string;
    stateId: string;
    x: number;
    y: number;
    size: 'small' | 'medium' | 'large';
}

// BOUNDS FOR PROJECTION: Lng [64.7, 95.8], Lat [6.3, 43.6]
// Formula: 
// x = ((lng - 64.7) / (95.8 - 64.7)) * 720 - 110
// y = ((43.6 - lat) / (43.6 - 6.3)) * 840 - 135

export const locations: Location[] = [
    // ========== CHAR DHAM ==========
    { id: 1, name: "Badrinath", slug: "badrinath", type: "Char Dham", description: "Badrinath", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80", stateId: 'ut', x: 232.5, y: 154.5, size: 'large' },
    { id: 2, name: "Dwarka", slug: "dwarka", type: "Char Dham", description: "Dwarka", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80", stateId: 'gj', x: -11.2, y: 346.0, size: 'large' },
    { id: 3, name: "Puri", slug: "puri", type: "Char Dham", description: "Puri", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80", stateId: 'or', x: 379.2, y: 400.7, size: 'large' },
    { id: 4, name: "Rameswaram", slug: "rameswaram", type: "Char Dham", description: "Rameswaram", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80", stateId: 'tn', x: 228.4, y: 637.7, size: 'large' },

    // ========== JYOTIRLINGA ==========
    { id: 5, name: "Somnath", slug: "somnath", type: "Jyotirlinga", description: "Somnath", image: "https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=800&q=80", stateId: 'gj', x: 22.0, y: 376.5, size: 'medium' },
    { id: 6, name: "Kedarnath", slug: "kedarnath", type: "Jyotirlinga", description: "Kedarnath", image: "https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=800&q=80", stateId: 'ut', x: 222.6, y: 154.7, size: 'medium' },
    { id: 7, name: "Omkareshwar", slug: "omkareshwar", type: "Jyotirlinga", description: "Omkareshwar", image: "https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=800&q=80", stateId: 'mp', x: 155.0, y: 345.9, size: 'small' },
    { id: 8, name: "Mahakaleshwar (Ujjain)", slug: "mahakaleshwar", type: "Jyotirlinga", description: "Mahakaleshwar (Ujjain)", image: "https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=800&q=80", stateId: 'mp', x: 146.4, y: 324.9, size: 'medium' },
    { id: 9, name: "Kashi Vishwanath (Varanasi)", slug: "kashi-vishwanath", type: "Jyotirlinga", description: "Kashi Vishwanath (Varanasi)", image: "https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=800&q=80", stateId: 'up', x: 313.8, y: 276.9, size: 'medium' },
    { id: 10, name: "Baidyanath (Deoghar)", slug: "baidyanath", type: "Jyotirlinga", description: "Baidyanath (Deoghar)", image: "https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=800&q=80", stateId: 'jh', x: 399.3, y: 295.3, size: 'medium' },
    { id: 11, name: "Trimbakeshwar (Nashik)", slug: "trimbakeshwar", type: "Jyotirlinga", description: "Trimbakeshwar (Nashik)", image: "https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=800&q=80", stateId: 'mh', x: 94.9, y: 397.8, size: 'small' },
    { id: 12, name: "Grishneshwar (Aurangabad)", slug: "grishneshwar", type: "Jyotirlinga", description: "Grishneshwar (Aurangabad)", image: "https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=800&q=80", stateId: 'mh', x: 132.4, y: 395.9, size: 'small' },
    { id: 13, name: "Bhimashankar", slug: "bhimashankar", type: "Jyotirlinga", description: "Bhimashankar", image: "https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=800&q=80", stateId: 'mh', x: 94.6, y: 417.3, size: 'small' },
    { id: 14, name: "Nageshwar (Dwarka)", slug: "nageshwar", type: "Jyotirlinga", description: "Nageshwar (Dwarka)", image: "https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=800&q=80", stateId: 'gj', x: -8.2, y: 343.8, size: 'small' },
    { id: 15, name: "Rameswaram Jyotirlinga", slug: "rameswaram-jyotirlinga", type: "Jyotirlinga", description: "Rameswaram Jyotirlinga", image: "https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=800&q=80", stateId: 'tn', x: 228.4, y: 637.7, size: 'small' },
    { id: 16, name: "Mallikarjuna (Srisailam)", slug: "mallikarjuna", type: "Jyotirlinga", description: "Mallikarjuna (Srisailam)", image: "https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=800&q=80", stateId: 'ap', x: 218.0, y: 484.8, size: 'medium' },

    // ========== KUMBH MELA ==========
    { id: 17, name: "Prayagraj", slug: "prayagraj", type: "Kumbh Mela", description: "Prayagraj", image: "https://images.unsplash.com/photo-1596791999908-011400272c72?auto=format&fit=crop&w=800&q=80", stateId: 'up', x: 287.0, y: 274.1, size: 'large' },
    { id: 18, name: "Haridwar", slug: "haridwar", type: "Kumbh Mela", description: "Haridwar", image: "https://images.unsplash.com/photo-1596791999908-011400272c72?auto=format&fit=crop&w=800&q=80", stateId: 'ut', x: 201.7, y: 172.5, size: 'large' },
    { id: 19, name: "Nashik", slug: "nashik", type: "Kumbh Mela", description: "Nashik", image: "https://images.unsplash.com/photo-1596791999908-011400272c72?auto=format&fit=crop&w=800&q=80", stateId: 'mh', x: 100.4, y: 396.5, size: 'large' },
    { id: 20, name: "Ujjain", slug: "ujjain", type: "Kumbh Mela", description: "Ujjain", image: "https://images.unsplash.com/photo-1596791999908-011400272c72?auto=format&fit=crop&w=800&q=80", stateId: 'mp', x: 146.4, y: 324.9, size: 'large' },

    // ========== SHAKTI PEETH ==========
    { id: 21, name: "Kamakhya (Guwahati)", slug: "guwahati-kamakhya", type: "Shakti Peeth", description: "Kamakhya (Guwahati)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'as', x: 515.2, y: 257.6, size: 'small' },
    { id: 22, name: "Kalighat (Kolkata)", slug: "kolkata-kalighat", type: "Shakti Peeth", description: "Kalighat (Kolkata)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'wb', x: 437.4, y: 339.7, size: 'small' },
    { id: 23, name: "Ambaji", slug: "ambaji", type: "Shakti Peeth", description: "Ambaji", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'gj', x: 78.8, y: 298.8, size: 'small' },
    { id: 24, name: "Jwalaji (Kangra)", slug: "kangra", type: "Shakti Peeth", description: "Jwalaji (Kangra)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'hp', x: 159.1, y: 129.1, size: 'small' },
    { id: 25, name: "Vishalakshi (Varanasi)", slug: "varanasi-vishalakshi", type: "Shakti Peeth", description: "Vishalakshi (Varanasi)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'up', x: 313.7, y: 277.2, size: 'small' },
    { id: 26, name: "Chamundeshwari (Mysore)", slug: "chamundeshwari", type: "Shakti Peeth", description: "Chamundeshwari (Mysore)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'ka', x: 167.0, y: 570.5, size: 'small' },
    { id: 27, name: "Jogulamba (Alampur)", slug: "jogulamba", type: "Shakti Peeth", description: "Jogulamba (Alampur)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'tg', x: 201.1, y: 489.1, size: 'small' },
    { id: 28, name: "Mahalakshmi (Kolhapur)", slug: "kolhapur", type: "Shakti Peeth", description: "Mahalakshmi (Kolhapur)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'mh', x: 110.9, y: 470.7, size: 'small' },
    { id: 29, name: "Vimala (Puri)", slug: "puri-shakti", type: "Shakti Peeth", description: "Vimala (Puri)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'or', x: 379.0, y: 400.7, size: 'small' },
    { id: 30, name: "Tara Tarini", slug: "tara-tarini", type: "Shakti Peeth", description: "Tara Tarini", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'or', x: 355.0, y: 415.0, size: 'small' },
    { id: 31, name: "Shrinkala Devi", slug: "shrinkala-devi", type: "Shakti Peeth", description: "Shrinkala Devi", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'wb', x: 425.0, y: 350.0, size: 'small' },
    { id: 32, name: "Kanyashram", slug: "kanyakumari", type: "Shakti Peeth", description: "Kanyashram", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'tn', x: 187.2, y: 664.7, size: 'small' },
    { id: 33, name: "Baidyanath (Deoghar)", slug: "baidyanath-deoghar", type: "Shakti Peeth", description: "Baidyanath (Deoghar)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'jh', x: 399.3, y: 295.3, size: 'small' },
    { id: 34, name: "Tripura Sundari (Udaipur)", slug: "tripura-sundari", type: "Shakti Peeth", description: "Tripura Sundari (Udaipur)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'tr', x: 509.8, y: 316.8, size: 'small' },
    { id: 35, name: "Jashoreshwari", slug: "jashoreshwari", type: "Shakti Peeth", description: "Jashoreshwari", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'wb', x: 450.0, y: 345.0, size: 'small' },
    { id: 36, name: "Sugandha", slug: "sugandha", type: "Shakti Peeth", description: "Sugandha", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'wb', x: 455.0, y: 340.0, size: 'small' },
    { id: 37, name: "Naina Devi", slug: "naina-devi", type: "Shakti Peeth", description: "Naina Devi", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'hp', x: 165.0, y: 135.0, size: 'small' },
    { id: 38, name: "Meenakshi (Chennai)", slug: "chennai", type: "Shakti Peeth", description: "Meenakshi (Chennai)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'tn', x: 245.0, y: 555.0, size: 'small' },
    { id: 39, name: "Meenakshi (Madurai)", slug: "madurai", type: "Shakti Peeth", description: "Meenakshi (Madurai)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'tn', x: 200.0, y: 620.0, size: 'small' },
    { id: 40, name: "Kamakshi (Kanchipuram)", slug: "kanchipuram", type: "Shakti Peeth", description: "Kamakshi (Kanchipuram)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'tn', x: 238.0, y: 565.0, size: 'small' },
    { id: 41, name: "Mangala Gauri (Gaya)", slug: "gaya", type: "Shakti Peeth", description: "Mangala Gauri (Gaya)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'br', x: 360.0, y: 285.0, size: 'small' },
    { id: 42, name: "Harsiddhi (Ujjain)", slug: "ujjain-shakti", type: "Shakti Peeth", description: "Harsiddhi (Ujjain)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'mp', x: 146.4, y: 324.9, size: 'small' },
    { id: 43, name: "Vindhyavasini", slug: "vindhyachal", type: "Shakti Peeth", description: "Vindhyavasini", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'up', x: 300.0, y: 280.0, size: 'small' },
    { id: 44, name: "Alopi Devi (Prayagraj)", slug: "prayagraj-alopi-devi", type: "Shakti Peeth", description: "Alopi Devi (Prayagraj)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'up', x: 287.0, y: 274.1, size: 'small' },
    { id: 45, name: "Bakreshwar", slug: "bakreshwar", type: "Shakti Peeth", description: "Bakreshwar", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'wb', x: 410.0, y: 315.0, size: 'small' },
    { id: 46, name: "Nalhati", slug: "nalhati", type: "Shakti Peeth", description: "Nalhati", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'wb', x: 415.0, y: 305.0, size: 'small' },
    { id: 47, name: "Attahas", slug: "attahas", type: "Shakti Peeth", description: "Attahas", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'wb', x: 420.0, y: 320.0, size: 'small' },
    { id: 48, name: "Fullara", slug: "fullara", type: "Shakti Peeth", description: "Fullara", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'wb', x: 418.0, y: 325.0, size: 'small' },
    { id: 49, name: "Chhinnamasta", slug: "chhinnamasta", type: "Shakti Peeth", description: "Chhinnamasta", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'jh', x: 375.0, y: 325.0, size: 'small' },
    { id: 50, name: "Biraja Devi", slug: "biraja-devi", type: "Shakti Peeth", description: "Biraja Devi", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'or', x: 390.9, y: 377.7, size: 'small' },
    { id: 51, name: "Manikyamba", slug: "manikyamba", type: "Shakti Peeth", description: "Manikyamba", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'ap', x: 286.0, y: 464.0, size: 'small' },
    { id: 52, name: "Bramaramba (Srisailam)", slug: "srisailam-shakti", type: "Shakti Peeth", description: "Bramaramba (Srisailam)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'ap', x: 218.0, y: 484.8, size: 'small' },
    { id: 53, name: "Kurukulla", slug: "shillong", type: "Shakti Peeth", description: "Kurukulla", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'ml', x: 520.0, y: 275.0, size: 'small' },
    { id: 54, name: "Nartiang Durga", slug: "nartiang", type: "Shakti Peeth", description: "Nartiang Durga", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'ml', x: 530.0, y: 280.0, size: 'small' },
    { id: 55, name: "Amarnath Shakti", slug: "amarnath-shakti", type: "Shakti Peeth", description: "Amarnath Shakti", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'jk', x: 139.3, y: 76.3, size: 'small' },
    { id: 56, name: "Vaishno Devi", slug: "vaishno-devi", type: "Shakti Peeth", description: "Vaishno Devi", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'jk', x: 127.4, y: 103.9, size: 'small' },
    { id: 57, name: "Tulja Bhavani", slug: "tuljapur", type: "Shakti Peeth", description: "Tulja Bhavani", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'mh', x: 155.0, y: 450.0, size: 'small' },
    { id: 58, name: "Renuka Devi", slug: "amravati", type: "Shakti Peeth", description: "Renuka Devi", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'mh', x: 210.0, y: 415.0, size: 'small' },
    { id: 59, name: "Kalika Mata (Pavagadh)", slug: "pavagadh", type: "Shakti Peeth", description: "Kalika Mata (Pavagadh)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'gj', x: 105.0, y: 325.0, size: 'small' },
    { id: 60, name: "Savirtri (Pushkar)", slug: "pushkar", type: "Shakti Peeth", description: "Savirtri (Pushkar)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'rj', x: 118.1, y: 250.4, size: 'small' },
    { id: 61, name: "Gayatri (Pushkar)", slug: "pushkar-gayatri", type: "Shakti Peeth", description: "Gayatri (Pushkar)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'rj', x: 118.1, y: 252.0, size: 'small' },
    { id: 62, name: "Danteshwari", slug: "danteshwari", type: "Shakti Peeth", description: "Danteshwari", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'ct', x: 275.1, y: 422.4, size: 'small' },
    { id: 63, name: "Hinglaj Mata", slug: "hinglaj-mata", type: "Shakti Peeth", description: "Hinglaj Mata", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'gj', x: -91.1, y: 272.4, size: 'small' },
    { id: 64, name: "Jayanti (Sylhet)", slug: "jayanti-sylhet", type: "Shakti Peeth", description: "Jayanti (Sylhet)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'as', x: 520.0, y: 270.0, size: 'small' },
    { id: 65, name: "Mahalaxmi (Sylhet)", slug: "mahalaxmi-sylhet", type: "Shakti Peeth", description: "Mahalaxmi (Sylhet)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'as', x: 515.0, y: 260.0, size: 'small' },
    { id: 66, name: "Guhyeshwari", slug: "guhyeshwari", type: "Shakti Peeth", description: "Guhyeshwari", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'up', x: 340.0, y: 220.0, size: 'small' },
    { id: 67, name: "Gandaki Chandi", slug: "gandaki-chandi", type: "Shakti Peeth", description: "Gandaki Chandi", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'up', x: 335.0, y: 200.0, size: 'small' },
    { id: 68, name: "Dakshayani (Mansarovar)", slug: "dakshayani", type: "Shakti Peeth", description: "Dakshayani (Mansarovar)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'ut', x: 275.0, y: 155.0, size: 'small' },
    { id: 69, name: "Indrakshi (Sri Lanka)", slug: "indrakshi", type: "Shakti Peeth", description: "Indrakshi (Sri Lanka)", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'tn', x: 244.8, y: 629.3, size: 'small' },
    { id: 70, name: "Karavipur", slug: "karavipur", type: "Shakti Peeth", description: "Karavipur", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'mh', x: 110.9, y: 470.7, size: 'small' },
    { id: 71, name: "Yugadya", slug: "yugadya", type: "Shakti Peeth", description: "Yugadya", image: "https://images.unsplash.com/photo-1601216845893-e1d0d1cfee9a?auto=format&fit=crop&w=800&q=80", stateId: 'wb', x: 428.0, y: 335.0, size: 'small' },
];
