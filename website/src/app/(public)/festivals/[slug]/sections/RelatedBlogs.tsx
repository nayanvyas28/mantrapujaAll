import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { getSupabaseServer } from '@/lib/supabaseServer';

interface RelatedBlogsProps {
    festivalName: string;
}

export const RelatedBlogs = async ({ festivalName }: RelatedBlogsProps) => {
    const supabase = getSupabaseServer();
    if (!supabase) return null;

    const { data: blogs } = await supabase
        .from('Final_blog')
        .select('id, title, slug, excerpt, category, tags')
        .eq('published', true)
        .or(`title.ilike.%${festivalName}%,tags.cs.{${festivalName}}`)
        .limit(3);

    const displayBlogs = (blogs && blogs.length > 0) ? blogs : [];
    
    if (displayBlogs.length === 0) {
        const { data: general } = await supabase
            .from('Final_blog')
            .select('id, title, slug, excerpt, category, tags')
            .eq('published', true)
            .order('created_at', { ascending: false })
            .limit(3);
        if (general) displayBlogs.push(...general);
    }

    if (displayBlogs.length === 0) return null;

    return (
        <section className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-20">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-px w-12 bg-saffron/30"></div>
                        <span className="text-saffron font-black tracking-[0.3em] uppercase text-xs">Knowledge Center</span>
                        <div className="h-px w-12 bg-saffron/30"></div>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black font-serif text-foreground leading-tight">
                        Sacred <span className="text-saffron">Insights</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayBlogs.map((blog: any, idx: number) => (
                        <Link
                            key={blog.id || idx}
                            href={`/blogs/${blog.slug}`}
                            className="group relative bg-card/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-border/50 hover:border-saffron/50 flex flex-col h-full"
                        >
                            <div className="h-2 bg-gradient-to-r from-saffron to-orange-600"></div>
                            <div className="p-10 flex flex-col flex-grow">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-4xl group-hover:scale-125 transition-transform duration-500">🕉️</span>
                                    <span className="px-4 py-1.5 rounded-full bg-saffron/10 text-saffron text-[10px] font-black uppercase tracking-widest border border-saffron/10">
                                        {blog.category || "Insight"}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-black text-foreground mb-4 leading-tight group-hover:text-saffron transition-colors duration-300 font-serif line-clamp-2">
                                    {blog.title}
                                </h3>

                                <p className="text-muted-foreground leading-relaxed mb-10 line-clamp-3 text-base flex-grow">
                                    {blog.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-8 border-t border-border/30">
                                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-saffron" />
                                        5 MIN READ
                                    </span>
                                    <span className="text-saffron font-black text-xs uppercase flex items-center gap-3 group-hover:gap-5 transition-all">
                                        Read More <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
