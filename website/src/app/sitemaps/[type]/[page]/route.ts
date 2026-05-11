import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

const URLS_PER_SITEMAP = 1000;
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.mantrapuja.com';

const STATIC_ROUTES = [
    '',
    '/about-us',
    '/contact-us',
    '/pooja-services',
    '/locations',
    '/festivals',
    '/blog',
    '/privacy-policy',
    '/terms-of-service',
    '/refund-policy',
    '/login',
    '/signup',
];

export async function GET(
    request: Request,
    { params }: { params: Promise<{ type: string; page: string }> }
) {
    const supabase = getSupabaseAdmin();
    if (!supabase) return new NextResponse('Supabase not configured', { status: 500 });

    try {
        // In Next.js 15+, params should be awaited or accessed correctly
        const resolvedParams = await Promise.resolve(params);
        const { type, page: pageParam } = resolvedParams;

        // Extract page number, removing the .xml extension if present
        const pageStr = pageParam.replace('.xml', '');
        const page = parseInt(pageStr, 10);

        if (isNaN(page) || page < 1) {
            return new NextResponse('Invalid page number', { status: 400 });
        }

        const startIdx = (page - 1) * URLS_PER_SITEMAP;
        const endIdx = startIdx + URLS_PER_SITEMAP - 1;

        let urls: { url: string; lastmod: string; priority: string; changefreq: string }[] = [];

        if (type === 'static') {
            if (page === 1) {
                // Only serve static routes on page 1
                urls = STATIC_ROUTES.map(route => ({
                    url: `${SITE_URL}${route}`,
                    lastmod: new Date().toISOString(),
                    priority: route === '' ? '1.0' : '0.8',
                    changefreq: route === '' ? 'daily' : 'weekly',
                }));
            }
        } else if (type === 'blog') {
            const { data } = await supabase
                .from('Final_blog')
                .select('slug, updated_at')
                .eq('published', true)
                .eq('is_active', true)
                .range(startIdx, endIdx);

            if (data) {
                urls = data.map((blog: any) => ({
                    url: `${SITE_URL}/blog/${blog.slug}`,
                    lastmod: blog.updated_at || new Date().toISOString(),
                    priority: '0.7',
                    changefreq: 'weekly',
                }));
            }
        } else if (type === 'pooja') {
            const { data } = await supabase
                .from('poojas')
                .select('slug, updated_at')
                .range(startIdx, endIdx);

            if (data) {
                urls = data.map((pooja: any) => ({
                    url: `${SITE_URL}/pooja-services/${pooja.slug}`,
                    lastmod: pooja.updated_at || new Date().toISOString(),
                    priority: '0.9',
                    changefreq: 'weekly',
                }));
            }
        } else if (type === 'destination') {
            const { data } = await supabase
                .from('destinations')
                .select('slug')
                .range(startIdx, endIdx);

            if (data) {
                urls = data.map((dest: any) => ({
                    url: `${SITE_URL}/locations/${dest.slug}`,
                    lastmod: new Date().toISOString(),
                    priority: '0.8',
                    changefreq: 'monthly',
                }));
            }
        } else if (type === 'author') {
            const cleanSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
            
            // 1. Predefined Personas
            const personas = [
                'Mantra Guru Ji', 'Aacharya Dr. Ram Ramanuj', 'Pandit Ravi Shastri', 
                'Acharya Meera', 'Dr. Aryan Sharma'
            ];

            // 2. Fetch authors from blog_authors table
            const { data: dbAuthors } = await supabase.from('blog_authors').select('name');
            
            // 3. Fetch "Ghost Authors" from Final_blog table
            const { data: blogAuthors } = await supabase.from('Final_blog').select('author_name').not('author_name', 'is', null);

            // Combine and Dedup
            const allAuthorNames = new Set<string>(personas);
            dbAuthors?.forEach((a: any) => allAuthorNames.add(a.name));
            blogAuthors?.forEach((b: any) => allAuthorNames.add(b.author_name));

            const authorList = Array.from(allAuthorNames);
            const paginatedAuthors = authorList.slice(startIdx, endIdx + 1);

            urls = paginatedAuthors.map((name: string) => ({
                url: `${SITE_URL}/authors/${cleanSlug(name)}`,
                lastmod: new Date().toISOString(),
                priority: '0.6',
                changefreq: 'monthly',
            }));
        } else {
            return new NextResponse('Invalid sitemap type', { status: 404 });
        }

        // Generate XML
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        for (const item of urls) {
            xml += `  <url>\n`;
            xml += `    <loc>${item.url}</loc>\n`;
            xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
            xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
            xml += `    <priority>${item.priority}</priority>\n`;
            xml += `  </url>\n`;
        }

        xml += `</urlset>`;

        return new NextResponse(xml, {
            status: 200,
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
            },
        });

    } catch (error) {
        console.error(`Error generating sitemap chunk:`, error);
        return new NextResponse('Error generating sitemap', { status: 500 });
    }
}
