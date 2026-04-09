import { notFound } from "next/navigation";
import Link from "next/link";
import { getPageBySlug, getCategoryBySlug } from "@/lib/contentService";
import { interpolateString } from "@/lib/templating";
import { Metadata } from "next";

// Force dynamic behavior
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { category: string; slug: string } }): Promise<Metadata> {
    const { category: categorySlug, slug: pageSlug } = await params;
    const page = await getPageBySlug(categorySlug, pageSlug);

    if (!page) return {};

    return {
        title: page.seo_title || page.title,
        description: page.seo_description || `Read about ${page.title}`,
    };
}

export default async function PageDetails({ params }: { params: { category: string; slug: string } }) {
    const { category: categorySlug, slug: pageSlug } = await params;
    const page = await getPageBySlug(categorySlug, pageSlug);
    const category = await getCategoryBySlug(categorySlug);

    if (!page || !category) {
        notFound();
    }

    // Data for interpolation
    const data = {
        page: {
            title: page.title,
            slug: page.slug,
            created_at: page.created_at,
            seo_title: page.seo_title,
            seo_description: page.seo_description
        },
        category: {
            name: category.name,
            slug: category.slug
        },
        global: {
            siteName: "Mantra Pooja",
            phone: "+91 99999 99999", // TODO: Fetch from Global Settings
            email: "contact@mantrapooja.com"
        }
    };

    // Interpolate Content
    // Assuming page.content.text contains the HTML content
    const rawContent = page.content?.text || '';
    const contentHtml = interpolateString(rawContent, data);

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4">
            <article className="container mx-auto max-w-3xl">
                <nav className="text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-saffron">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href={`/${category.slug}`} className="hover:text-saffron capitalize">{category.name}</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium truncate">{page.title}</span>
                </nav>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12">
                    <header className="mb-8 border-b border-gray-100 dark:border-gray-700 pb-8">
                        <div className="text-sm text-saffron font-medium mb-3 uppercase tracking-wider">{category.name}</div>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4">{page.title}</h1>
                        {page.seo_description && (
                            <p className="text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">{page.seo_description}</p>
                        )}
                    </header>

                    <div
                        className="prose dark:prose-invert prose-lg max-w-none prose-saffron prose-headings:font-serif prose-headings:font-bold prose-p:leading-relaxed prose-img:rounded-xl prose-img:shadow-md"
                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />
                </div>
            </article>
        </div>
    );
}
