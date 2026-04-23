const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../backend/.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCategories() {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('order');

    if (error) {
        console.error('Error fetching categories:', error);
        return;
    }

    console.log('Categories:', JSON.stringify(data, null, 2));
}

checkCategories();
