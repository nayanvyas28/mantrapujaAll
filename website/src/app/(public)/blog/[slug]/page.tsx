import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import BlogDetailClient from '@/components/blog/BlogDetailClient';
import BlogContent from '@/components/blog/BlogContent';
import BlogSchema from '@/components/blog/BlogSchema';
import SocialShare from '@/components/blog/SocialShare';
import TableOfContents from '@/components/blog/TableOfContents';
import NewsletterCTA from '@/components/blog/NewsletterCTA';
import { getBlogBySlug } from '@/lib/contentService';
import { SchemaConfig } from '@/lib/schema-utils';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Revalidate every minute
export const revalidate = 60;

export const dynamicParams = true;

export async function generateStaticParams() {
    return [];
}

// Dynamic Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug: rawSlug } = await params;
    const slug = decodeURIComponent(rawSlug);
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        return {
            title: 'Blog Not Found',
        };
    }

    const seo = blog.seo || {};
    const title = seo.meta_title || blog.blog_title || blog.title || `${blog.title} | MantraPuja`;
    const description = seo.meta_description || blog.meta_description || blog.content?.introduction?.substring(0, 160) || "";
    const keywords = seo.meta_tags || blog.meta_tags || blog.tags || [];
    const imageUrl = blog.featured_image_url || blog.image_url || 'https://via.placeholder.com/1200x630';

    return {
        title,
        description,
        keywords: keywords,
        openGraph: {
            title: seo.og_title || title,
            description: seo.og_description || description,
            images: [imageUrl],
            type: 'article',
            tags: keywords,
        },
        twitter: {
            card: 'summary_large_image',
            title: seo.og_title || title,
            description: seo.og_description || description,
            images: [imageUrl],
        },
        alternates: {
            canonical: `https://mantrapuja.com/blog/${blog.slug}`,
        }
    };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug: rawSlug } = await params;
    const requestedSlug = decodeURIComponent(rawSlug);
    const blog = await getBlogBySlug(requestedSlug);

    if (!blog) {
        notFound();
    }

    // 🚀 SEO Redirect Logic (Case-insensitive & Decode-aware):
    if (requestedSlug.toLowerCase() !== blog.slug.toLowerCase()) {
        permanentRedirect(`/blog/${encodeURIComponent(blog.slug)}`);
    }

    // 🛠️ Prepare Schema Config
    const seo = blog.seo || {};
    const rawContent = blog.blog_content || blog.content;
    let structuredContent: any = null;
    try {
        if (rawContent) {
            structuredContent = (typeof rawContent === 'object') ? rawContent : JSON.parse(rawContent);
        }
    } catch (e) {}

    const schemaConfig: SchemaConfig = {
        title: seo.meta_title || blog.blog_title || blog.title,
        description: seo.meta_description || blog.meta_description || blog.content?.introduction?.substring(0, 160) || "",
        slug: blog.slug,
        imageUrl: blog.featured_image_url || blog.image_url || 'https://mantrapuja.com/logo.png',
        datePublished: blog.created_at || new Date().toISOString(),
        dateModified: blog.updated_at || blog.created_at,
        authorName: blog.author?.name || "MantraPuja Team",
        authorRole: blog.author?.role || "Divine Guide",
        authorAvatar: blog.author?.avatar || "https://mantrapuja.com/logo.png",
        category: blog.category || "Spiritual",
        keywords: seo.meta_tags || blog.meta_tags || blog.tags || [],
        faq: structuredContent?.faq || []
    };

    const canonicalUrl = `https://mantrapuja.com/blog/${blog.slug}`;

    return (
        <>
            {/* 🛡️ Elite JSON-LD Entity Graph (Server Side) */}
            <BlogSchema key="blog-schema" config={schemaConfig} />
            
            <BlogDetailClient 
                key="blog-client-wrapper"
                blog={{
                    title: blog.blog_title || blog.title,
                    image_url: blog.featured_image_url || blog.image_url,
                    category: blog.category,
                    created_at: blog.created_at || new Date().toISOString(),
                    reading_time: blog.reading_time,
                    author: blog.author,
                    slug: blog.slug
                }}
                socialShare={
                    <div className="mt-16 pt-12 border-t border-border/50 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 dark:text-white/40">Share this Wisdom</span>
                            <SocialShare key="blog-social" url={canonicalUrl} title={blog.blog_title || blog.title} orientation="horizontal" />
                        </div>
                        <Link href="/blog" className="text-[10px] font-black uppercase tracking-[0.2em] text-saffron hover:text-orange-500 dark:hover:text-white transition-all flex items-center gap-2 group">
                            Explore More Articles
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                }
                toc={<TableOfContents key="blog-toc" sections={structuredContent?.sections || []} />}
                newsletter={<NewsletterCTA key="blog-newsletter" />}
            >
                <BlogContent key="blog-content" blog={blog} />
            </BlogDetailClient>
        </>
    );
}
