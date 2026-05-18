import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runAudit() {
    console.log("=== 🕉️ BLOG & AUTHOR DATABASE INTEGRITY AUDIT ===");

    // 1. Fetch all blogs
    const { data: blogs, error: blogError } = await supabase
        .from('Final_blog')
        .select('*');

    if (blogError) {
        console.error("Error fetching blogs:", blogError);
        return;
    }

    console.log(`Total blogs in database: ${blogs?.length ?? 0}`);

    const activeBlogs = blogs?.filter(b => b.published && b.is_active) ?? [];
    console.log(`Active (published & is_active) blogs: ${activeBlogs.length}`);

    // Check for invalid slugs or empty titles
    const invalidSlugs: any[] = [];
    const emptyMetadata: any[] = [];
    const missingAuthors: any[] = [];

    activeBlogs.forEach(blog => {
        if (!blog.slug || blog.slug.trim() === '') {
            invalidSlugs.push({ id: blog.id, title: blog.title, reason: "Empty slug" });
        } else if (/[^a-z0-9\-\u0900-\u097F]/i.test(blog.slug)) {
            // Check for illegal special characters, but allow unicode/devanagari characters
            invalidSlugs.push({ id: blog.id, title: blog.title, slug: blog.slug, reason: "Special characters in slug" });
        }

        const seo = blog.seo || {};
        if (!seo.meta_title && !blog.blog_title && !blog.title) {
            emptyMetadata.push({ id: blog.id, slug: blog.slug, reason: "Missing title/meta_title" });
        }

        if (!blog.author_name) {
            missingAuthors.push({ id: blog.id, slug: blog.slug });
        }
    });

    console.log(`\nInvalid Slugs: ${invalidSlugs.length}`);
    if (invalidSlugs.length > 0) {
        console.log(JSON.stringify(invalidSlugs, null, 2));
    }

    console.log(`Empty/Missing Metadata: ${emptyMetadata.length}`);
    if (emptyMetadata.length > 0) {
        console.log(JSON.stringify(emptyMetadata, null, 2));
    }

    console.log(`Blogs with fallback/missing author names: ${missingAuthors.length}`);

    // 2. Fetch all authors
    const { data: dbAuthors, error: authorError } = await supabase
        .from('blog_authors')
        .select('*');

    console.log(`\nRegistered authors in 'blog_authors': ${dbAuthors?.length ?? 0}`);
    if (dbAuthors) {
        dbAuthors.forEach(a => {
            console.log(`- ${a.name} (${a.role || 'No Role'})`);
        });
    }

    // 3. Extract unique author names from active blogs to check for ghost authors
    const ghostAuthors = new Set<string>();
    activeBlogs.forEach(blog => {
        if (blog.author_name) {
            const hasRegistered = dbAuthors?.some(a => a.name.toLowerCase() === blog.author_name.toLowerCase());
            if (!hasRegistered) {
                ghostAuthors.add(blog.author_name);
            }
        }
    });

    console.log(`\nGhost/Implicit Authors (referenced in blogs but not in 'blog_authors'): ${ghostAuthors.size}`);
    ghostAuthors.forEach(name => {
        console.log(`- ${name}`);
    });
}

runAudit();
