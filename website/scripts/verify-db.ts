
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing Environment Variables");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function verifyBlogs() {
    console.log("Checking database at:", SUPABASE_URL);

    // Fetch last 5 blogs
    const { data, error } = await supabase
        .from('blogs')
        .select('id, title, slug, created_at, published')
        .order('created_at', { ascending: false })
        .limit(5);

    if (error) {
        console.error("Error fetching blogs:", error);
    } else {
        console.log("Found Blogs:", data);
    }
}

verifyBlogs();
