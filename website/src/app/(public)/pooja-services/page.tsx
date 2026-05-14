import { Metadata } from 'next';
import { supabase } from '@/lib/supabaseClient';
import { getUiConfig } from '@/lib/uiMapping';
import { resolvePujaImage } from '@/lib/imageResolver';
import PoojaListingClient from './PoojaListingClient';

export const metadata: Metadata = {
    title: 'Vedic Pooja Services | Online Puja Booking | MantraPuja',
    description: 'Book authentic Vedic Pujas performed by certified Pandits. Experience divine rituals for health, wealth, and prosperity from the comfort of your home.',
    keywords: ['Online Puja', 'Vedic Rituals', 'Pandit Booking', 'Hindu Puja', 'MantraPuja'],
};

interface DatabasePooja {
    id: string;
    name: string;
    slug: string;
    images?: string[];
    hero_image?: string;
    heroImage?: string;
    description?: string;
    about_description?: string;
    tagline?: string;
    benefits?: string[];
    price?: number;
    display_price?: number;
    tags?: string[];
    special_offer_price?: number;
    is_special_offer?: boolean;
    categories?: { name: string };
}

// --- DATA FETCHING (SERVER SIDE) ---
async function getListingData() {
    // 1. Fetch Categories, Pujas, and Blogs in parallel on the server
    const [categoriesRes, pujasRes, blogsRes] = await Promise.all([
        supabase.from('categories').select('name').order('name'),
        supabase.from('poojas').select('*, categories(name)').eq('is_active', true).order('sort_order', { ascending: true }),
        supabase.from('Final_blog').select('id, title, slug, image_url, category, excerpt, tags, created_at').order('created_at', { ascending: false }).limit(3)
    ]);

    if (pujasRes.error) {
        console.error('Error fetching pujas:', pujasRes.error);
    }

    // Heuristic keywords for better categorization
    const festivalKeywords = ['durga', 'kali', 'diwali', 'holi', 'purnima', 'ganesh', 'krishna', 'shivratri', 'navratri', 'utsav', 'festival', 'vrat', 'savitri', 'katha'];
    const careerKeywords = ['career', 'business', 'job', 'success', 'wealth', 'lakshmi', 'dhan', 'money', 'aishwarya', 'trade', 'barrier', 'promotion'];
    const healthKeywords = ['health', 'healing', 'ayush', 'mrityunjaya', 'body', 'heart', 'chakra', 'lifesaving'];
    const peaceKeywords = ['peace', 'shanti', 'pitru', 'dosh', 'graha', 'shani', 'rahu', 'ketu', 'mangal', 'nivaran', 'remedy', 'kaalsarp'];

    // 3. Map Pujas with Centralized Image Resolver & Server-Side Sorting
    const mappedPujas = (pujasRes.data as unknown as DatabasePooja[] || []).map((item: DatabasePooja) => {
        const uiConfig = getUiConfig(item.slug);
        
        // Use Centralized Resolver
        const resolved = resolvePujaImage(item.images || item.hero_image || item.heroImage || uiConfig.image);

        // 4. Smart Mapping Overrides
        let dbCategory = item.categories?.name || 'Rituals';
        let finalCategory = dbCategory;
        const nameLower = item.name.toLowerCase();

        // Apply Heuristics
        if (festivalKeywords.some(k => nameLower.includes(k))) finalCategory = 'Festival';
        else if (nameLower.includes('business') || nameLower.includes('trade') || dbCategory === 'Business') finalCategory = 'Business';
        else if (careerKeywords.some(k => nameLower.includes(k)) || dbCategory === 'Career') finalCategory = 'Career';
        else if (healthKeywords.some(k => nameLower.includes(k)) || dbCategory === 'Health') finalCategory = 'Health';
        else if (peaceKeywords.some(k => nameLower.includes(k)) || dbCategory === 'Dosh Nivaran') finalCategory = 'Peace';

        return {
            ...uiConfig,
            id: item.id,
            name: item.name,
            slug: item.slug,
            image: resolved.url,
            isPlaceholder: resolved.isPlaceholder,
            imageType: resolved.type,
            desc: item.description || item.about_description || item.tagline || '',
            benefits: item.benefits || [],
            price: item.price || 0,
            display_price: item.display_price,
            tags: item.tags || [],
            special_offer_price: item.special_offer_price,
            is_special_offer: item.is_special_offer,
            category: finalCategory
        };
    }).sort((a, b) => {
        // High-quality images always first on server-load
        if (!a.isPlaceholder && b.isPlaceholder) return -1;
        if (a.isPlaceholder && !b.isPlaceholder) return 1;
        return 0;
    });

    // 5. Map Blogs with fallback
    const mappedBlogs = (blogsRes.data || []).map((blog: any) => ({
        ...blog,
        image_url: (blog.image_url && blog.image_url.trim() !== '') ? blog.image_url.trim() : '/diya.png'
    }));

    // 6. Final Categories: Mix of DB and our logical ones
    const dbCategories = (categoriesRes.data || []).map((c: { name: string }) => c.name);
    const essentialCategories = ['Festival', 'Business', 'Career', 'Peace', 'Health'];
    
    // Create a unique set of categories
    const finalCategoryList = Array.from(new Set([
        ...essentialCategories,
        ...dbCategories.filter((c: string) => !['Rituals', 'Dosh Nivaran', 'Career', 'Business', 'Health', 'Peace'].includes(c))
    ])).sort();

    return {
        pujas: mappedPujas,
        categories: finalCategoryList,
        blogs: mappedBlogs
    };
}

export const revalidate = 60; // Cache for 1 minute

export default async function PoojaServicesPage() {
    const { pujas, categories, blogs } = await getListingData();

    return (
        <PoojaListingClient 
            initialPujas={pujas} 
            initialCategories={categories} 
            initialBlogs={blogs} 
        />
    );
}
