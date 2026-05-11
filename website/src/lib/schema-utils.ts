/**
 * 🕉️ MantraPuja Elite Schema Utilities
 * 
 * This utility generates a unified @graph JSON-LD structure for Blog Detail Pages.
 * Designed for elite SEO, AI search readiness, and high-scale App Router performance.
 */

export interface SchemaConfig {
    title: string;
    description: string;
    slug: string;
    imageUrl: string;
    datePublished: string;
    dateModified?: string;
    authorName: string;
    authorRole: string;
    authorAvatar: string;
    category: string;
    keywords: string[];
    faq?: Array<{ question: string; answer: string }>;
}

export function generateBlogDetailSchema(config: SchemaConfig) {
    const {
        title,
        description,
        slug,
        imageUrl,
        datePublished,
        dateModified,
        authorName,
        authorRole,
        authorAvatar,
        category,
        keywords,
        faq
    } = config;

    const baseUrl = 'https://mantrapuja.com';
    const canonicalUrl = `${baseUrl}/blog/${slug}`;
    const orgName = 'MantraPuja';
    const orgLogo = `${baseUrl}/logo.png`;

    // 1. Organization Entity
    const organization = {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: orgName,
        url: baseUrl,
        logo: {
            '@type': 'ImageObject',
            '@id': `${baseUrl}/#logo`,
            url: orgLogo,
            contentUrl: orgLogo,
            caption: orgName,
            width: 512,
            height: 512,
        },
        image: { '@id': `${baseUrl}/#logo` },
        sameAs: [
            'https://www.facebook.com/mantrapuja',
            'https://www.instagram.com/mantrapuja',
            'https://twitter.com/mantrapuja'
        ],
    };

    // 2. WebSite Entity
    const website = {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: orgName,
        description: 'Vedic Rituals, Astrology & Spiritual Wisdom',
        publisher: { '@id': `${baseUrl}/#organization` },
        potentialAction: [
            {
                '@type': 'SearchAction',
                target: {
                    '@type': 'EntryPoint',
                    urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
            },
        ],
        inLanguage: 'en-GB',
    };

    // 3. Author (Person) Entity
    const author = {
        '@type': 'Person',
        '@id': `${baseUrl}/#author/${authorName.toLowerCase().replace(/ /g, '-')}`,
        name: authorName,
        jobTitle: authorRole,
        image: {
            '@type': 'ImageObject',
            url: authorAvatar,
        },
        worksFor: { '@id': `${baseUrl}/#organization` },
    };

    // 4. BreadcrumbList Entity
    const breadcrumbs = {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}/#breadcrumb`,
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: baseUrl,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: `${baseUrl}/blog`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: title,
                item: canonicalUrl,
            },
        ],
    };

    // 5. Article Entity
    const article = {
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}/#article`,
        isPartOf: { '@id': `${canonicalUrl}/#webpage` },
        author: { '@id': author['@id'] },
        headline: title,
        datePublished: datePublished,
        dateModified: dateModified || datePublished,
        description: description,
        mainEntityOfPage: { '@id': `${canonicalUrl}/#webpage` },
        publisher: { '@id': `${baseUrl}/#organization` },
        image: {
            '@type': 'ImageObject',
            '@id': `${canonicalUrl}/#primaryimage`,
            url: imageUrl,
            width: 1200,
            height: 630,
        },
        articleSection: category,
        keywords: keywords.join(', '),
    };

    // 6. FAQPage Entity (Conditional)
    let faqSchema = null;
    if (faq && faq.length > 0) {
        faqSchema = {
            '@type': 'FAQPage',
            '@id': `${canonicalUrl}/#faq`,
            mainEntity: faq.map(item => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer,
                },
            })),
        } as any;
    }

    // 7. WebPage Wrapper
    const webpage = {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}/#webpage`,
        url: canonicalUrl,
        name: title,
        isPartOf: { '@id': `${baseUrl}/#website` },
        primaryImageOfPage: { '@id': `${canonicalUrl}/#primaryimage` },
        breadcrumb: { '@id': `${canonicalUrl}/#breadcrumb` },
        description: description,
        inLanguage: 'en-GB',
        potentialAction: [{ '@type': 'ReadAction', target: [canonicalUrl] }],
    };

    // Build the Final @graph
    const graph = [
        organization,
        website,
        webpage,
        author,
        breadcrumbs,
        article,
    ];

    if (faqSchema) {
        graph.push(faqSchema);
    }

    return {
        '@context': 'https://schema.org',
        '@graph': graph,
    };
}
