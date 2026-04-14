/**
 * Utility to extract YouTube Video ID from various URL formats
 * including standard, shorts, and embed links.
 */
export const getYouTubeID = (url: string) => {
    if (!url) return null;
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?)|(shorts\/))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[8].length === 11) ? match[8] : null;
};

/**
 * Normalizes cloud storage links (Google Drive, Dropbox) into 
 * direct-playable media links to avoid CORS and sharing page issues.
 */
export const getDirectMediaUrl = (url: string) => {
    if (!url) return url;
    
    // Google Drive
    if (url.includes('drive.google.com')) {
        const id = url.match(/\/d\/(.+?)\/|id=(.+?)(&|$)/);
        const driveId = id ? (id[1] || id[2]) : null;
        if (driveId) return `https://drive.google.com/uc?export=download&id=${driveId}`;
    }
    
    // Dropbox
    if (url.includes('dropbox.com')) {
        return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');
    }
    
    return url;
};
