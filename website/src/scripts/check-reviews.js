
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'website/.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkReviews() {
    console.log("Checking for reviews in puja_bookings...");
    const { data, error } = await supabase
        .from('puja_bookings')
        .select('id, puja_slug, rating, review_text, user_id')
        .not('rating', 'is', null);

    if (error) {
        console.error("Error:", error);
        return;
    }

    console.log(`Found ${data.length} reviews:`);
    console.log(JSON.stringify(data, null, 2));
}

checkReviews();
