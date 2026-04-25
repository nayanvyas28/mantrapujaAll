import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogDetailClient from '@/components/blog/BlogDetailClient';

// Revalidate every minute
export const revalidate = 60;

// Helper to fetch blog by slug
async function getBlog(slug: string) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Try finding by the provided slug first
    console.log(`[getBlog] 1. Searching for slug: "${slug}"`);
    let { data: blog, error } = await supabase
        .from('blogs')
        .select('*, blog_authors(*)')
        .eq('slug', slug)
        .eq('published', true)
        .single();

    if (error) {
        console.log(`[getBlog] 1. Error finding slug "${slug}":`, error.message);
    } else if (blog) {
        console.log(`[getBlog] 1. Found blog: "${blog.title}"`);
    } else {
        console.log(`[getBlog] 1. Not found: "${slug}"`);
    }

    // If not found, try robust fallback (Decoded, NFC, NFD)
    if (!blog) {
        try {
            const decodedSlug = decodeURIComponent(slug);
            const candidates = new Set<string>();

            candidates.add(decodedSlug);
            candidates.add(decodedSlug.normalize('NFC'));
            candidates.add(decodedSlug.normalize('NFD'));
            candidates.delete(slug); // Don't re-try original if it matches one of the above

            console.log(`[getBlog] 2. Fallback candidates:`, Array.from(candidates));

            for (const candidate of candidates) {
                console.log(`[getBlog] Trying candidate: "${candidate}"`);
                const { data: foundBlog } = await supabase
                    .from('blogs')
                    .select('*, blog_authors(*)')
                    .eq('slug', candidate)
                    .eq('published', true)
                    .single();

                if (foundBlog) {
                    blog = foundBlog;
                    console.log(`[getBlog] Match found for candidate: "${candidate}"`);
                    // IMPORTANT: Clear the initial error since we found it
                    error = null;
                    break;
                }
            }
        } catch (e) {
            console.error("[getBlog] Error during fallback decoding:", e);
        }
    }

    if (!blog) {
        console.error(`[getBlog] Final failure: Blog not found for slug "${slug}"`);
        return null;
    }

    // Fetch full author info from blog_authors table
    const { data: authorData } = await supabase
        .from('blog_authors')
        .select('*')
        .eq('name', blog.author_name)
        .single();

    return {
        ...blog,
        author: {
            name: authorData?.name || blog.author_name || "MantraPuja Team",
            avatar: authorData?.avatar || blog.author_avatar || "/logo.png",
            role: authorData?.role || blog.author_role || "Editor",
            bio: authorData?.bio || ""
        }
    };
}

// Dynamic Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        return {
            title: 'Blog Not Found',
        };
    }

    const title = blog.meta_title || `${blog.title} | Mantra Pooja`;
    const description = blog.meta_description || blog.content.replace(/<[^>]*>?/gm, '').substring(0, 160);
    const keywords = blog.meta_tags || blog.tags || [];

    return {
        title,
        description,
        keywords: keywords,
        openGraph: {
            title,
            description,
            images: [blog.image_url || 'https://via.placeholder.com/1200x630'],
            type: 'article',
            tags: keywords,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [blog.image_url || 'https://via.placeholder.com/1200x630'],
        }
    };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        notFound();
    }

    return <BlogDetailClient blog={blog} />;
}
