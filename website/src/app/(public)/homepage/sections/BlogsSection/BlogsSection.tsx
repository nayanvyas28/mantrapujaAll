import Link from "next/link";

interface Blog {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    image_url?: string;
    category?: string;
    readTime?: string;
    gradient?: string;
    tags?: string[];
    content?: string;
    icon?: string;
}

const getBlogCategoryStyle = (category: string) => {
    const c = category.toLowerCase();
    if (c.includes('rituals')) return 'border-orange-500/30 text-orange-600 bg-orange-50/50';
    if (c.includes('wisdom')) return 'border-amber-500/30 text-amber-600 bg-amber-50/50';
    return 'border-saffron/30 text-saffron bg-saffron/5';
};

export default function BlogsSection({ blogs }: { blogs: Blog[] }) {
    const gradients = ["from-orange-500 to-red-600", "from-amber-500 to-orange-600", "from-yellow-500 to-amber-600"];
    const icons = ["☀️", "🕉️", "🪔"];

    return (
        <section className="pt-36 pb-20 md:pt-48 md:pb-32 bg-background relative overflow-hidden z-10">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-saffron rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-saffron/40"></div>
                        <span className="text-saffron-dark font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">Knowledge Center</span>
                        <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-saffron/40"></div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                        Spiritual Insights & <span className="text-saffron">Guidance</span>
                    </h2>
                    <p className="max-w-4xl mx-auto text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                        Discover ancient wisdom and practical guidance for your spiritual journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogs.map((blog, idx) => (
                        <Link
                            key={idx}
                            href={`/blog/${blog.slug}`}
                            className="group relative bg-card rounded-[24px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50 hover:border-saffron/50 block flex flex-col h-full"
                        >
                            <div className={`h-2 bg-gradient-to-r ${blog.gradient || gradients[idx % gradients.length]}`}></div>
                            <div className="p-4 md:p-6 flex flex-col flex-1">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                                        {blog.icon || icons[idx % icons.length]}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getBlogCategoryStyle(blog.tags?.[0] || blog.category || "Insight")}`}>
                                        {blog.tags?.[0] || blog.category || "Insight"}
                                    </span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-foreground mb-4 leading-tight group-hover:text-saffron transition-colors duration-300 line-clamp-2" style={{ fontFamily: 'Georgia, serif' }}>
                                    {blog.title}
                                </h3>
                                <div className="text-base text-muted-foreground leading-relaxed mb-8 line-clamp-3 flex-grow">
                                    {blog.excerpt || (blog.content ? blog.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' : '')}
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                                    <span className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {blog.readTime || "5 min read"}
                                    </span>
                                    <span className="text-saffron font-bold text-lg flex items-center gap-4 group-hover:gap-6 transition-all">
                                        Read Full Insight
                                        <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-saffron/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/blog" className="group relative inline-flex items-center gap-4 px-12 py-6 md:px-16 md:py-8 rounded-full border-2 border-saffron/20 text-saffron hover:text-white transition-all duration-300 font-black overflow-hidden">
                        <span className="relative z-10 flex items-center gap-4 text-xl uppercase tracking-widest">
                            Explore All Articles
                        </span>
                        <div className="absolute inset-0 bg-saffron translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
