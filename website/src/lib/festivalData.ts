import { supabase } from './supabaseClient';

export interface GalleryImage {
    id: string;
    url: string;
    alt: string;
    category: 'ritual' | 'temple' | 'crowd' | 'decoration';
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface Ritual {
    name: string;
    description: string;
    timing: string;
}

export interface Festival {
    id: string;
    name: string;
    slug: string;
    date: Date;
    shortDesc: string;
    description: string;
    heroImage: string;
    heroImageAlt?: string;
    significance: {
        mythology: string;
        cultural: string;
        spiritual: string;
    };
    rituals: Ritual[];
    regionalVariations: {
        north?: string;
        south?: string;
        east?: string;
        west?: string;
    };
    faqs: FAQ[];
    gallery: GalleryImage[];
}

// Helper to transform Supabase data to Festival interface
const transformFestival = (data: any): Festival => {
    return {
        ...data,
        date: new Date(data.date),
        shortDesc: data.short_desc,
        heroImage: data.hero_image,
        heroImageAlt: data.hero_image_alt,
        regionalVariations: data.regional_variations || {}
    };
};

export const getAllFestivals = async (): Promise<Festival[]> => {
    try {
        const { data, error } = await supabase
            .from('festivals')
            .select('*')
            .order('date', { ascending: true });

        if (error) throw error;
        return (data || []).map(transformFestival);
    } catch (error) {
        console.error('Error fetching festivals:', error);
        return [];
    }
};

export const getUpcomingFestivals = async (limit = 3): Promise<Festival[]> => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const { data, error } = await supabase
            .from('festivals')
            .select('*')
            .gte('date', today)
            .order('date', { ascending: true })
            .limit(limit);

        if (error) throw error;
        
        if (!data || data.length === 0) {
            // Fallback: if no future festivals, just get the next ones regardless of year for demo
            const { data: allData } = await supabase
                .from('festivals')
                .select('*')
                .order('date', { ascending: true })
                .limit(limit);
            return (allData || []).map(transformFestival);
        }

        return (data || []).map(transformFestival);
    } catch (error) {
        console.error('Error fetching upcoming festivals:', error);
        return [];
    }
};

export const getFestivalBySlug = async (slug: string): Promise<Festival | null> => {
    try {
        const { data, error } = await supabase
            .from('festivals')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) throw error;
        return data ? transformFestival(data) : null;
    } catch (error) {
        console.error(`Error fetching festival with slug ${slug}:`, error);
        return null;
    }
};
