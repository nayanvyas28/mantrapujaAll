const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSlugs() {
    const { data, error } = await supabase
        .from('puja_bookings')
        .select('puja_slug, puja_name')
        .not('puja_slug', 'is', null);

    if (error) {
        console.error(error);
        return;
    }

    const uniqueSlugs = [...new Set(data.map(b => b.puja_slug))];
    console.log('Unique Slugs in Database:', uniqueSlugs);
    
    const mapping = {};
    data.forEach(b => {
        mapping[b.puja_slug] = b.puja_name;
    });
    console.log('Slug to Name Mapping:', mapping);
}

checkSlugs();
