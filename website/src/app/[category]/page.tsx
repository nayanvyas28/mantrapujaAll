import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, getPagesByCategory } from "@/lib/contentService";

// Force dynamic behavior since we are using DB
export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: { params: { category: string } }) {
    const { category: categorySlug } = await params;
    const category = await getCategoryBySlug(categorySlug);

    if (!category) {
        notFound();
    }

    const pages = await getPagesByCategory(category.id);

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <nav className="text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-saffron">Home</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium capitalize">{category.name}</span>
                </nav>

                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4">
                        {category.name}
                    </h1>
                    {category.description && (
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            {category.description}
                        </p>
                    )}
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pages.map((page) => (
                        <Link
                            key={page.id}
                            href={`/${category.slug}/${page.slug}`}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 dark:border-gray-700 hover:border-saffron/30 group"
                        >
                            <h2 className="text-xl font-bold mb-2 group-hover:text-saffron transition-colors">
                                {page.title}
                            </h2>
                            {page.seo_description && (
                                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
                                    {page.seo_description}
                                </p>
                            )}
                            <div className="mt-4 flex items-center text-saffron text-sm font-medium">
                                Read More <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Link>
                    ))}
                    {pages.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                            No pages found in this category yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
