
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPujas() {
    const { data, error } = await supabase
        .from('poojas')
        .select('name, slug, categories(name)')
        .eq('is_active', true);

    if (error) {
        console.error(error);
        return;
    }

    console.log('--- PUJA CATEGORY AUDIT ---');
    data.forEach(p => {
        const cat = p.categories?.name || 'NONE';
        console.log(`[${cat}] ${p.name}`);
    });
}

checkPujas();
