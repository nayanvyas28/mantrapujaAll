import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runTest() {
    console.log("=== 🕉️ HIGH-PERFORMANCE IN-MEMORY BLOG ROUTING INTEGRITY AUDIT ===");

    // Fetch all active blogs from the DB in paginated batches
    let allBlogs: any[] = [];
    let hasMore = true;
    let page = 0;
    const pageSize = 1000;

    console.log("Fetching all blogs from Supabase...");
    while (hasMore) {
        const { data, error } = await supabase
            .from('Final_blog')
            .select('id, title, slug, published, is_active, author_name, author_role, author_avatar, category')
            .range(page * pageSize, (page + 1) * pageSize - 1);

        if (error) {
            console.error("Error fetching page:", error);
            break;
        }

        if (data && data.length > 0) {
            allBlogs = allBlogs.concat(data);
            page++;
            if (data.length < pageSize) {
                hasMore = false;
            }
        } else {
            hasMore = false;
        }
    }

    const activeBlogs = allBlogs.filter(b => b.published && b.is_active);
    console.log(`Successfully fetched ${activeBlogs.length} active blogs.`);

    // Build lookup set of exact slugs stored in the database
    const slugSet = new Set<string>();
    activeBlogs.forEach(b => {
        if (b.slug) slugSet.add(b.slug);
    });

    // Simulated in-memory getBlogBySlug
    function resolveInMemory(requestedSlug: string): boolean {
        // 1. Primary search
        if (slugSet.has(requestedSlug)) return true;

        // 2. Robust Fallback (Decoded, NFC, NFD)
        try {
            const decodedSlug = decodeURIComponent(requestedSlug);
            const candidates = new Set<string>();
            candidates.add(decodedSlug);
            candidates.add(decodedSlug.normalize('NFC'));
            candidates.add(decodedSlug.normalize('NFD'));
            candidates.delete(requestedSlug);

            for (const candidate of candidates) {
                if (slugSet.has(candidate)) {
                    return true;
                }
            }
        } catch (e) {}

        return false;
    }

    let successfulResolutions = 0;
    let failedResolutions = 0;
    const failures: any[] = [];

    for (const blog of activeBlogs) {
        // Simulating Next.js Page Router params lookup:
        // Next.js passes the decodeURIComponent slug to our getBlogBySlug page
        const requestedSlug = decodeURIComponent(blog.slug);
        
        // Query the in-memory resolver
        const isResolved = resolveInMemory(requestedSlug);

        if (isResolved) {
            successfulResolutions++;
        } else {
            failedResolutions++;
            failures.push({
                id: blog.id,
                title: blog.title,
                dbSlug: blog.slug,
                decodedRequestedSlug: requestedSlug
            });
        }
    }

    console.log(`\nAudit Complete!`);
    console.log(`✅ Successfully Resolving Blog Routes: ${successfulResolutions} / ${activeBlogs.length}`);
    console.log(`❌ Failed/404 Blog Routes: ${failedResolutions} / ${activeBlogs.length}`);

    if (failedResolutions > 0) {
        console.log(`\nDetailed failures (First 20):`);
        console.log(JSON.stringify(failures.slice(0, 20), null, 2));
    }
}

runTest();
