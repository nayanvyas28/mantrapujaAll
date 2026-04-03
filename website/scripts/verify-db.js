
console.log("Script starting...");
try {
    const { createClient } = require('@supabase/supabase-js');
    console.log("Supabase client imported.");

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        console.error("Missing Environment Variables");
        process.exit(1);
    }
    console.log("Env vars found.");

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    console.log("Supabase client created.");

    async function verifyBlogs() {
        console.log("Checking database at:", SUPABASE_URL);

        // Fetch last 5 blogs
        const { data, error } = await supabase
            .from('blogs')
            .select('id, title, slug, created_at, published')
            .order('created_at', { ascending: false })
            .limit(5);

        if (error) {
            console.error("Error fetching blogs:", JSON.stringify(error, null, 2));
        } else {
            console.log("Found Blogs:", JSON.stringify(data, null, 2));
        }
    }

    verifyBlogs().catch(e => console.error("Async error:", e));

} catch (err) {
    console.error("Global error:", err);
}
