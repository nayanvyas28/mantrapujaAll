import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { Metadata } from 'next';

export async function getSeoMetadata(path: string, defaultMetadata: Metadata): Promise<Metadata> {
    const supabase = getSupabaseAdmin();
    if (!supabase) return defaultMetadata;

    try {
        const { data, error } = await supabase
            .from('seo_metadata')
            .select('*')
            .eq('path', path)
            .single();

        if (error || !data) {
            return defaultMetadata;
        }

        return {
            ...defaultMetadata,
            title: data.title || defaultMetadata.title,
            description: data.description || defaultMetadata.description,
            keywords: data.keywords ? data.keywords.split(',').map((k: string) => k.trim()) : defaultMetadata.keywords,
            openGraph: {
                ...defaultMetadata.openGraph,
                title: data.title || defaultMetadata.openGraph?.title,
                description: data.description || defaultMetadata.openGraph?.description,
                images: data.og_image ? [{ url: data.og_image }] : defaultMetadata.openGraph?.images,
            },
            twitter: {
                ...defaultMetadata.twitter,
                title: data.title || defaultMetadata.twitter?.title,
                description: data.description || defaultMetadata.twitter?.description,
                images: data.og_image ? [data.og_image] : defaultMetadata.twitter?.images,
            }
        };
    } catch (e) {
        console.error("Error fetching SEO metadata:", e);
        return defaultMetadata;
    }
}
