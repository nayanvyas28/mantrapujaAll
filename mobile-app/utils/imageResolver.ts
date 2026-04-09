const LOCAL_IMAGE_MAP: Record<string, any> = {
    '/pujaimages/shivpuja.webp': require('../public/pujaimages/shivpuja.webp'),
    '/pujaimages/durgapuja.webp': require('../public/pujaimages/durgapuja.webp'),
    '/pujaimages/ganeshpuja.webp': require('../public/pujaimages/ganeshpuja.webp'),
    '/pujaimages/hanuman.webp': require('../public/pujaimages/hanuman.webp'),
    '/pujaimages/kaal sarp 1.webp': require('../public/pujaimages/kaal sarp 1.webp'),
    '/pujaimages/kaal sarp.webp': require('../public/pujaimages/kaal sarp.webp'),
    '/pujaimages/kalipuja.webp': require('../public/pujaimages/kalipuja.webp'),
    '/pujaimages/krishnapuja.webp': require('../public/pujaimages/krishnapuja.webp'),
    '/pujaimages/lakshmipuja.webp': require('../public/pujaimages/lakshmipuja.webp'),
    '/pujaimages/navgrahapuja.webp': require('../public/pujaimages/navgrahapuja.webp'),
    '/pujaimages/rampuja.webp': require('../public/pujaimages/rampuja.webp'),
    '/pujaimages/rudra abhishek 1.webp': require('../public/pujaimages/rudra abhishek 1.webp'),
    '/pujaimages/rudra abhishek 2.webp': require('../public/pujaimages/rudra abhishek 2.webp'),
    '/pujaimages/rudraabhishek.webp': require('../public/pujaimages/rudraabhishek.webp'),
    '/pujaimages/saraswatipuja.webp': require('../public/pujaimages/saraswatipuja.webp'),
    '/pujaimages/vishnupuja.webp': require('../public/pujaimages/vishnupuja.webp'),
    '/pujaimages/HanumanGarhiSindoorPuja.webp': require('../public/pujaimages/HanumanGarhiSindoorPuja.webp')
};

export const getImageSource = (images: string[] | null) => {
    if (!images || images.length === 0 || !images[0]) {
        return require('../assets/images/puja_thumbnail.jpg'); // Fallback
    }

    let firstImage = images[0];

    // Upgrade HTTP to HTTPS for remote URLs to fix Cleartext/App Transport Security blocks
    if (firstImage.startsWith('http://')) {
        firstImage = firstImage.replace('http://', 'https://');
    }

    if (firstImage.startsWith('https://')) {
        return { uri: firstImage };
    }

    // If it's a local path, handle case-insensitivity since DB and file system might differ
    if (firstImage.startsWith('/pujaimages/')) {
        const normalizedPath = firstImage.toLowerCase();
        const matchedKey = Object.keys(LOCAL_IMAGE_MAP).find(
            key => key.toLowerCase() === normalizedPath
        );

        if (matchedKey && LOCAL_IMAGE_MAP[matchedKey]) {
            return LOCAL_IMAGE_MAP[matchedKey];
        }
    }

    return require('../assets/images/puja_thumbnail.jpg');
};
