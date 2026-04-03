require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function listPujas() {
    console.log('--- CURRENTLY FEATURED ---');
    const { data: featured, error: fError } = await supabase
        .from('poojas')
        .select('id, name, is_featured, images')
        .eq('is_featured', true);

    if (fError) console.error(fError);
    else {
        featured.forEach(p => console.log(`[FEATURED] ${p.name} (Images: ${p.images ? p.images.length : 0})`));
    }

    console.log('\n--- POTENTIAL REPLACEMENTS (Has Images, Not Featured) ---');
    const { data: candidates, error: cError } = await supabase
        .from('poojas')
        .select('id, name, is_featured, images')
        .eq('is_featured', false)
        .not('images', 'is', null)
        .limit(20);

    if (cError) console.error(cError);
    else {
        candidates.forEach(p => {
            if (p.images && p.images.length > 0) {
                console.log(`[CANDIDATE] ${p.name}`);
            }
        });
    }
}

listPujas();
