const express = require('express');
const router = express.Router();
const { supabase } = require('../utils/supabase');

// Get all pujas with filters
router.get('/', async (req, res) => {
    try {
        const { category_id, show_on_home } = req.query;
        let query = supabase.from('poojas').select('*');

        if (category_id) query = query.eq('category_id', category_id);
        if (show_on_home === 'true') query = query.eq('show_on_home', true);

        const { data, error } = await query.order('sort_order', { ascending: false });
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all categories
router.get('/categories', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('order', { ascending: true });
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single puja by slug
router.get('/detail/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        console.log(`[Pujas] Fetching ritual for slug: ${slug}`);
        const { data, error } = await supabase
            .from('poojas')
            .select('*')
            .eq('slug', slug)
            .single();
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
