import React from 'react';
import { Sun, BookOpen, MessageSquare } from 'lucide-react';

interface BlogContentProps {
    blog: any;
}

export default function BlogContent({ blog }: BlogContentProps) {
    if (!blog) return null;

    const rawContent = blog.blog_content || blog.content;

    let structuredContent = null;
    try {
        if (rawContent) {
            structuredContent = (typeof rawContent === 'object') ? rawContent : JSON.parse(rawContent);
        }
    } catch (e) {
        console.error("JSON Parse Error in BlogContent", e);
    }

    const hasStructuredData = structuredContent && (
        (structuredContent.sections && Array.isArray(structuredContent.sections) && structuredContent.sections.length > 0) || 
        structuredContent.introduction || 
        (structuredContent.faq && Array.isArray(structuredContent.faq) && structuredContent.faq.length > 0) ||
        structuredContent.conclusion
    );

    if (hasStructuredData) {
        return (
            <div className="space-y-20 relative z-10">
                {/* Introduction */}
                {structuredContent.introduction && (
                    <section className="border-l-4 border-saffron pl-8">
                        <div className="text-xl md:text-2xl leading-relaxed font-serif font-medium text-foreground/90 italic">
                            {String(structuredContent.introduction).split('\n').map((p: string, i: number) => (
                                <p key={i} className={i > 0 ? "mt-4" : ""}>{p}</p>
                            ))}
                        </div>
                    </section>
                )}

                {/* Sections */}
                <div className="space-y-24">
                    {structuredContent.sections?.map((section: any, idx: number) => (
                        <section key={idx}>
                            <h2 
                                id={`section-${idx + 1}`}
                                className="text-3xl md:text-5xl font-black font-serif mb-8 flex items-center gap-4 scroll-mt-32"
                            >
                                <span className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center text-saffron text-xl">
                                    {idx + 1}
                                </span>
                                {section.heading}
                            </h2>
                            <div className="text-lg md:text-xl leading-relaxed text-foreground/80 space-y-6">
                                {String(section.content || '').split('\n').map((p: string, i: number) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                            {section.key_points?.length > 0 && (
                                <ul className="mt-10 grid gap-4 bg-secondary/30 p-8 md:p-12 rounded-[40px] border border-border/40">
                                    {section.key_points.map((point: string, kIdx: number) => (
                                        <li key={kIdx} className="flex items-start gap-4">
                                            <div className="mt-2.5 w-2 h-2 rounded-full bg-saffron shrink-0 shadow-lg shadow-saffron/50"></div>
                                            <span className="text-base md:text-lg font-medium">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                </div>

                {/* FAQ Section */}
                {structuredContent.faq?.length > 0 && (
                    <section className="bg-gradient-to-br from-saffron/5 to-orange-600/5 rounded-[48px] p-8 md:p-16 border border-saffron/10">
                        <h2 className="text-3xl md:text-4xl font-black font-serif mb-12 flex items-center gap-4">
                            <MessageSquare className="text-saffron w-8 h-8" />
                            Divine Inquiries (FAQ)
                        </h2>
                        <div className="space-y-12">
                            {structuredContent.faq.map((item: any, fIdx: number) => (
                                <div key={fIdx} className="group/faq">
                                    <h3 className="text-xl md:text-2xl font-black mb-4 flex gap-4 text-foreground group-hover/faq:text-saffron transition-colors">
                                        <span className="text-saffron italic opacity-50 font-serif" aria-hidden="true">Q.</span>
                                        {item.question}
                                    </h3>
                                    <div className="pl-10 text-lg text-foreground/70 border-l-2 border-saffron/20 group-hover/faq:border-saffron/50 ml-4 py-1 transition-colors">
                                        {item.answer}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Conclusion */}
                {structuredContent.conclusion && (
                    <div className="text-center py-16 px-8 bg-saffron/5 rounded-[40px] border border-saffron/10">
                        <p className="text-2xl md:text-3xl font-serif font-black italic text-foreground leading-snug">
                            "{structuredContent.conclusion}"
                        </p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="prose prose-xl dark:prose-invert max-w-none prose-headings:font-serif" 
             dangerouslySetInnerHTML={{ __html: typeof rawContent === 'string' ? rawContent : '' }} />
    );
}
