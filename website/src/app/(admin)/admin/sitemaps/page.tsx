import React from 'react';
import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { FileCode, Globe, Copy, CheckCircle, ExternalLink } from 'lucide-react';

const URLS_PER_SITEMAP = 1000;
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.mantrapuja.com';

async function getSitemapData() {
    const supabase = getSupabaseAdmin();
    if (!supabase) return { blogsPacks: 1, poojasPacks: 1, destPacks: 1, totalUrls: 12 };

    const [blogsCount, poojasCount, destinationsCount] = await Promise.all([
        supabase.from('Final_blog').select('*', { count: 'exact', head: true }).eq('published', true).eq('is_active', true).then(res => res.count || 0),
        supabase.from('poojas').select('*', { count: 'exact', head: true }).then(res => res.count || 0),
        supabase.from('destinations').select('*', { count: 'exact', head: true }).then(res => res.count || 0)
    ]);

    return {
        blogsPacks: Math.ceil(blogsCount / URLS_PER_SITEMAP) || 1,
        poojasPacks: Math.ceil(poojasCount / URLS_PER_SITEMAP) || 1,
        destPacks: Math.ceil(destinationsCount / URLS_PER_SITEMAP) || 1,
        totalUrls: blogsCount + poojasCount + destinationsCount + 12 // +12 for static pages
    };
}

export default async function SitemapManager() {
    const data = await getSitemapData();

    const renderSitemapCards = (type: string, packs: number, title: string) => {
        const cards = [];
        for (let i = 1; i <= packs; i++) {
            const url = `${SITE_URL}/sitemaps/${type}/${i}.xml`;
            const start = (i - 1) * URLS_PER_SITEMAP + 1;
            const end = i * URLS_PER_SITEMAP;

            cards.push(
                <div key={`${type}-${i}`} className="bg-white border rounded-xl p-6 shadow-sm flex flex-col justify-between">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-100/50 rounded-lg">
                                <FileCode className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{title} Sitemap {i}</h3>
                                <p className="text-sm text-gray-500">Items {start} to {end}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex bg-gray-50 rounded-md truncate items-center border p-2">
                        <span className="text-sm truncate flex-1 text-gray-600 mr-2 font-mono">{url}</span>
                        <a href={url} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-800 transition-colors mr-1">
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            );
        }
        return cards;
    };

    return (
        <div className="space-y-8 p-6 lg:p-10 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                    SEO & Sitemap Management
                </h1>
                <p className="text-gray-600">
                    Manage your dynamically generated XML sitemaps to optimize search engine crawling.
                    Currently handling ~{data.totalUrls} live URLs.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Main Sitemap Index */}
                <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white border-none rounded-xl p-6 shadow-md flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-lg">Main Sitemap Index</h3>
                        </div>
                        <p className="text-orange-50 text-sm mb-6">
                            The primary index file linking to all segment sitemaps. Submit this directly to Google Search Console.
                        </p>
                    </div>
                    <div className="flex bg-black/20 rounded-md truncate items-center p-2 backdrop-blur-sm">
                        <span className="text-sm truncate flex-1 text-white mr-2 font-mono tracking-tight">{SITE_URL}/sitemap.xml</span>
                        <a href={`${SITE_URL}/sitemap.xml`} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-white/20 rounded text-white transition-colors">
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800">Static Pages</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderSitemapCards('static', 1, 'Core & Legal')}
                </div>

                <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800 mt-8">Dynamic Blogs ({data.blogsPacks} file{data.blogsPacks > 1 ? 's' : ''})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderSitemapCards('blog', data.blogsPacks, 'Blog Posts')}
                </div>

                <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800 mt-8">Pooja Services ({data.poojasPacks} file{data.poojasPacks > 1 ? 's' : ''})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderSitemapCards('pooja', data.poojasPacks, 'Poojas')}
                </div>

                <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800 mt-8">Destinations ({data.destPacks} file{data.destPacks > 1 ? 's' : ''})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderSitemapCards('destination', data.destPacks, 'Locations')}
                </div>
            </div>
        </div>
    );
}
