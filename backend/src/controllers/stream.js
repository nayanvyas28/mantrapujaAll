const ytdl = require('@distube/ytdl-core');
const axios = require('axios');

const PIPED_INSTANCES = [
    'https://pipedapi.adminforge.de',
    'https://pipedapi.qdi.fi',
    'https://pipedapi.kavin.rocks',
    'https://pipedapi.hostux.net',
    'https://pipedapi.astartes.nl'
];

const getStreamUrl = async (req, res) => {
    const { youtubeId } = req.params;
    if (!youtubeId) {
        return res.status(400).json({ success: false, error: 'YouTube ID is required' });
    }

    console.log(`[Stream] Master Resolver for: ${youtubeId}`);

    // Attempt 1: Try Piped API Instances (New verified list)
    for (const instance of PIPED_INSTANCES) {
        try {
            console.log(`[Stream] Trying Piped: ${instance}`);
            const apiUrl = `${instance}/streams/${youtubeId}`;
            const response = await axios.get(apiUrl, { timeout: 8000 });
            
            if (response.data && response.data.audioStreams) {
                // Find any high-quality audio stream
                const audioStream = response.data.audioStreams.find(s => s.format === 'M4A') || response.data.audioStreams[0];

                if (audioStream && audioStream.url) {
                    console.log(`[Stream] SUCCESS via Piped (${instance})`);
                    return res.json({
                        success: true,
                        streamUrl: audioStream.url,
                        title: response.data.title || 'YouTube Audio',
                        source: 'piped-api'
                    });
                }
            }
        } catch (e) {
            console.warn(`[Stream] Piped instance ${instance} failed: ${e.message}`);
        }
    }

    // Attempt 2: Final fallback to ytdl-core with different strategy
    try {
        console.log(`[Stream] Falling back to ytdl-core (Safe Mode)...`);
        const videoUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
        const info = await ytdl.getInfo(videoUrl, {
            requestOptions: {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                }
            }
        });
        const formats = ytdl.filterFormats(info.formats, 'audioonly');
        const bestFormat = ytdl.chooseFormat(formats, { quality: 'highestaudio' });

        if (bestFormat && bestFormat.url) {
            console.log(`[Stream] SUCCESS via ytdl-core`);
            return res.json({
                success: true,
                streamUrl: bestFormat.url,
                title: info.videoDetails.title,
                source: 'youtube-direct'
            });
        }
    } catch (e) {
        console.error(`[Stream] ALL METHODS FAILED for ${youtubeId}:`, e.message);
    }

    res.status(500).json({ 
        success: false, 
        error: 'All streaming sources are currently busy or blocked by YouTube. Please try again or use direct MP3.' 
    });
};

module.exports = {
    getStreamUrl
};
