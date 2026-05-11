import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseServer';

const URLS_PER_SITEMAP = 1000;
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.mantrapuja.com';

export const dynamic = 'force-dynamic';

export async function GET() {
    const supabase = getSupabaseAdmin();
    if (!supabase) return new NextResponse('Supabase not configured', { status: 500 });

    try {
        // Get counts for dynamic content
        const [blogsCount, poojasCount, destinationsCount, authorsCount] = await Promise.all([
            supabase.from('Final_blog').select('*', { count: 'exact', head: true }).eq('published', true).eq('is_active', true).then((res: any) => res.count || 0),
            supabase.from('poojas').select('*', { count: 'exact', head: true }).then((res: any) => res.count || 0),
            supabase.from('destinations').select('*', { count: 'exact', head: true }).then((res: any) => res.count || 0),
            supabase.from('blog_authors').select('*', { count: 'exact', head: true }).then((res: any) => res.count || 0)
        ]);

        // Calculate number of sitemaps needed for each type
        const blogPacks = Math.ceil(blogsCount / URLS_PER_SITEMAP) || 1;
        const poojaPacks = Math.ceil(poojasCount / URLS_PER_SITEMAP) || 1;
        const destPacks = Math.ceil(destinationsCount / URLS_PER_SITEMAP) || 1;
        const authorPacks = Math.ceil(authorsCount / URLS_PER_SITEMAP) || 1;

        // Generate sitemap index XML
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        // Static pages sitemap
        xml += `  <sitemap>\n`;
        xml += `    <loc>${SITE_URL}/sitemaps/static/1.xml</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
        xml += `  </sitemap>\n`;

        // Blogs sitemaps
        for (let i = 1; i <= blogPacks; i++) {
            xml += `  <sitemap>\n`;
            xml += `    <loc>${SITE_URL}/sitemaps/blog/${i}.xml</loc>\n`;
            xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
            xml += `  </sitemap>\n`;
        }

        // Poojas sitemaps
        for (let i = 1; i <= poojaPacks; i++) {
            xml += `  <sitemap>\n`;
            xml += `    <loc>${SITE_URL}/sitemaps/pooja/${i}.xml</loc>\n`;
            xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
            xml += `  </sitemap>\n`;
        }

        // Destinations sitemaps
        for (let i = 1; i <= destPacks; i++) {
            xml += `  <sitemap>\n`;
            xml += `    <loc>${SITE_URL}/sitemaps/destination/${i}.xml</loc>\n`;
            xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
            xml += `  </sitemap>\n`;
        }

        // Authors sitemaps
        for (let i = 1; i <= authorPacks; i++) {
            xml += `  <sitemap>\n`;
            xml += `    <loc>${SITE_URL}/sitemaps/author/${i}.xml</loc>\n`;
            xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
            xml += `  </sitemap>\n`;
        }

        xml += `</sitemapindex>`;

        return new NextResponse(xml, {
            status: 200,
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
            },
        });
    } catch (error) {
        console.error('Error generating sitemap index:', error);
        return new NextResponse('Error generating sitemap index', { status: 500 });
    }
}
