const { supabase } = require('../utils/supabase');

/**
 * Fetch all deities/Gods for the music section top bar
 */
const getGods = async (req, res) => {
    console.log('[Music] Fetching Gods...');
    try {
        const { data, error } = await supabase
            .from('music_gods')
            .select('*')
            .order('name');

        if (error) {
            console.error('[Music] Supabase Error (Gods):', error);
            return res.status(500).json({ success: false, error: error.message, code: error.code });
        }

        return res.json({ success: true, data: data || [] });
    } catch (error) {
        console.error('[Music] Global Error (Gods):', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Fetch songs/bhajans with optional filters
 */
const getSongs = async (req, res) => {
    const { god_id, category } = req.query;
    console.log(`[Music] Fetching Songs (God: ${god_id}, Category: ${category})...`);
    try {
        let query = supabase.from('music_songs').select('*');

        if (god_id) {
            query = query.eq('god_id', god_id);
        }

        if (category) {
            query = query.eq('category', category);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) {
            console.error('[Music] Supabase Error (Songs):', error);
            return res.status(500).json({ success: false, error: error.message, code: error.code });
        }

        return res.json({ success: true, data: data || [] });
    } catch (error) {
        console.error('[Music] Global Error (Songs):', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getGods,
    getSongs
};
