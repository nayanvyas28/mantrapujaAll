/**
 * Basic Geocoding utility for India cities.
 * For a real app, use a proper geocoding service like Google Maps or 
 * AstrologyAPI's geo_location endpoint.
 */

const INDIA_CITIES_COORDS: Record<string, { lat: number, lon: number }> = {
    'varanasi': { lat: 25.3176, lon: 82.9739 },
    'mumbai': { lat: 19.0760, lon: 72.8777 },
    'delhi': { lat: 28.6139, lon: 77.2090 },
    'bangalore': { lat: 12.9716, lon: 77.5946 },
    'chennai': { lat: 13.0827, lon: 80.2707 },
    'hyderabad': { lat: 17.3850, lon: 78.4867 },
    'ahmedabad': { lat: 23.0225, lon: 72.5714 },
    'pune': { lat: 18.5204, lon: 73.8567 },
    'kolkata': { lat: 22.5726, lon: 88.3639 },
    'jaipur': { lat: 26.9124, lon: 75.7873 },
    'lucknow': { lat: 26.8467, lon: 80.9462 },
    'ujjain': { lat: 23.1760, lon: 75.7885 },
    'haridwar': { lat: 29.9457, lon: 78.1642 },
    'rishikesh': { lat: 30.0869, lon: 78.2676 },
};

export const getCityCoords = (cityName: string) => {
    const key = cityName.toLowerCase();
    for (const city in INDIA_CITIES_COORDS) {
        if (key.includes(city)) return INDIA_CITIES_COORDS[city];
    }
    // Default to Varanasi if not found
    return INDIA_CITIES_COORDS['varanasi'];
};
