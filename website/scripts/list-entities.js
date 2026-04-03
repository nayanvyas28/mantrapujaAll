
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function listEntities() {
    console.log("Listing Categories:");
    const { data: cats } = await supabase.from('categories').select('name, slug');
    console.log(JSON.stringify(cats, null, 2));

    console.log("\nListing Blogs (Unique Tags):");
    const { data: blogs } = await supabase.from('blogs').select('tags');
    const tags = new Set();
    blogs?.forEach(b => b.tags?.forEach(t => tags.add(t)));
    console.log(Array.from(tags));

    console.log("\nChecking for 'festivals' table...");
    const { count: festCount } = await supabase.from('festivals').select('*', { count: 'exact', head: true });
    console.log("Festivals count:", festCount);

    console.log("\nChecking for 'locations' table...");
    const { count: locCount } = await supabase.from('locations').select('*', { count: 'exact', head: true });
    console.log("Locations count:", locCount);
}

listEntities();
