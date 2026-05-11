import { supabase as defaultSupabase } from './supabaseClient';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Category, Page } from '@/types/content';

// --- Robust Client Selection ---
// On the server, we use the Service Role key to bypass RLS issues for public data.
// On the client, we use the default (Anon/Auth) client.
let serverSupabase: SupabaseClient | null = null;

const getClient = (): SupabaseClient => {
    // If we're on the client (browser), always return the default client
    if (typeof window !== 'undefined') return defaultSupabase;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // If we're on the server and have the service role key
    if (serviceKey && supabaseUrl) {
        if (!serverSupabase) {
            serverSupabase = createClient(
                supabaseUrl,
                serviceKey,
                { auth: { persistSession: false } }
            );
        }
        return serverSupabase;
    }
    
    return defaultSupabase;
};

// --- Categories ---

export const getCategories = async (): Promise<Category[]> => {
    const supabase = getClient();
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('order', { ascending: true });

    if (error) throw error;
    return data || [];
};

export const createCategory = async (category: Omit<Category, 'id' | 'created_at'>): Promise<Category | null> => {
    // Write operations always use the default client (checking auth/RLS)
    // unless we explicitly want server-side admin writes. 
    // For Admin Panel (Client Component), defaultSupabase (with Auth session) is correct.
    const { data, error } = await defaultSupabase
        .from('categories')
        .insert([category])
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const updateCategory = async (id: string, updates: Partial<Category>): Promise<Category | null> => {
    const { data, error } = await defaultSupabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const deleteCategory = async (id: string): Promise<void> => {
    const { error } = await defaultSupabase
        .from('categories')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

export const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
    const supabase = getClient();
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) return null;
    return data;
};

// --- Pages ---

export const getPagesByCategory = async (categoryId: string): Promise<Page[]> => {
    const supabase = getClient();
    const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('category_id', categoryId)
        .order('order', { ascending: true });

    if (error) throw error;
    return data || [];
};

export const getPageBySlug = async (categorySlug: string, pageSlug: string): Promise<Page | null> => {
    const supabase = getClient();
    // First get category ID
    const { data: category, error: catError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();

    if (catError || !category) return null;

    const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('category_id', category.id)
        .eq('slug', pageSlug)
        .single();

    if (error) return null;
    return data;
};

// Write operations for pages (Admin Panel)
export const createPage = async (page: Omit<Page, 'id' | 'created_at'>): Promise<Page | null> => {
    const { data, error } = await defaultSupabase
        .from('pages')
        .insert([page])
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const updatePage = async (id: string, updates: Partial<Page>): Promise<Page | null> => {
    const { data, error } = await defaultSupabase
        .from('pages')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const deletePage = async (id: string): Promise<void> => {
    const { error } = await defaultSupabase
        .from('pages')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// --- Site Structure ---

export interface SiteNode {
    id: string;
    type: 'category' | 'page' | 'static' | 'blog' | 'blog_root';
    name: string;
    slug: string;
    children?: SiteNode[];
    data?: any; // Full object data
}

export const getSiteStructure = async (): Promise<SiteNode[]> => {
    // Should be running on client-side for the visual editor
    try {
        const response = await fetch('/api/site-structure');
        if (!response.ok) {
            const errBody = await response.json();
            throw new Error(errBody.error || "Failed to fetch site structure");
        }
        return await response.json();
    } catch (error) {
        console.error("getSiteStructure error:", error);
        throw error;
    }
};

// --- Component Library ---

export interface SavedComponent {
    id: string;
    name: string;
    content: any; // HTML string or JSON
    category?: string;
    preview_image?: string;
    created_at?: string;
}

export async function getSavedComponents(): Promise<SavedComponent[]> {
    const supabase = getClient();
    const { data, error } = await supabase
        .from('saved_components')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.warn("Error fetching components (table might not exist yet):", error);
        return [];
    }
    return data || [];
}

export async function saveComponent(name: string, content: any, category: string = 'General'): Promise<SavedComponent | null> {
    const { data, error } = await defaultSupabase
        .from('saved_components')
        .insert([{ name, content, category }])
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteComponent(id: string): Promise<void> {
    const { error } = await defaultSupabase
        .from('saved_components')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

// --- Pooja (Product) Types ---
export interface Pooja {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    content: any; // JSON content for description or details
    images: string[];
    seo_title?: string;
    seo_description?: string;
    is_featured: boolean;
    is_hero: boolean;
    tags?: string[];
    created_at?: string;
    updated_at?: string;
}

// --- Blog Types ---
export interface Blog {
    id: string;
    title: string;
    blog_title?: string;
    slug: string;
    content?: any;
    blog_content?: any;
    excerpt: string;
    image_url: string;
    featured_image_url?: string;
    tags?: any; // Can be string[] or jsonb
    published: boolean;
    is_featured: boolean;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
    category?: string;
    views?: number;
    reading_time?: string;
    seo?: any;
    // SEO fields from schema
    meta_title?: string;
    meta_description?: string;
    meta_tags?: any;
    // Author fields from schema
    author_name?: string;
    author_role?: string;
    author_avatar?: string;
    author_id?: string;
    author?: {
        name: string;
        avatar: string;
        role: string;
        bio: string;
    };
}

// --- Location Types ---
export interface Location {
    id: string;
    name: string;
    slug: string;
    type: string;
    description: string;
    images: string[];
    is_active: boolean;
    is_featured: boolean;
    created_at?: string;
    updated_at?: string;
}

// --- Serving City Types ---
export interface ServingCity {
    id?: string;
    name: string;
    display_order: number;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}

// --- Pooja Service ---

export const getPoojas = async (): Promise<Pooja[]> => {
    const supabase = getClient();
    const { data, error } = await supabase
        .from('poojas')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;

    // Implementation: Ensure all poojas have at least the logo if no images are present
    return (data || []).map(pooja => ({
        ...pooja,
        images: (!pooja.images || pooja.images.length === 0) ? ['/logo.png'] : pooja.images
    }));
};

export const createPooja = async (pooja: Partial<Pooja>): Promise<Pooja | null> => {
    const { data, error } = await defaultSupabase
        .from('poojas')
        .insert(pooja)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// --- Serving Cities Functions ---

export async function getServingCities() {
    const supabase = getClient();
    const { data, error } = await supabase
        .from('serving_cities')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) throw error;
    return data as ServingCity[];
}

// --- Serving Cities (Admin API Wrapper to Bypass RLS) ---

export async function createServingCity(city: Partial<ServingCity>) {
    const response = await fetch('/api/admin/cities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(city)
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to create city');
    }
    return await response.json();
}

export async function updateServingCity(id: string, updates: Partial<ServingCity>) {
    const response = await fetch('/api/admin/cities', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates })
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to update city');
    }
    return await response.json();
}

export async function deleteServingCity(id: string) {
    console.log('[deleteServingCity] Starting delete for ID:', id);
    const url = `/api/admin/cities?id=${id}`;
    console.log('[deleteServingCity] DELETE URL:', url);

    const response = await fetch(url, {
        method: 'DELETE'
    });

    console.log('[deleteServingCity] Response status:', response.status);
    console.log('[deleteServingCity] Response OK?', response.ok);

    if (!response.ok) {
        const err = await response.json();
        console.error('[deleteServingCity] Delete failed:', err);
        throw new Error(err.error || 'Failed to delete city');
    }

    const result = await response.json();
    console.log('[deleteServingCity] Delete successful:', result);
    return true;
}

export async function bulkUpdateCityOrder(updates: { id: string, display_order: number }[]) {
    // Parallelize the API calls
    await Promise.all(updates.map(u => updateServingCity(u.id, { display_order: u.display_order })));
}

export const updatePooja = async (id: string, updates: Partial<Pooja>): Promise<Pooja | null> => {
    const { data, error } = await defaultSupabase
        .from('poojas')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const deletePooja = async (id: string): Promise<boolean> => {
    const { error } = await defaultSupabase
        .from('poojas')
        .delete()
        .eq('id', id);

    if (error) throw error;
    return true;
};

// --- Blog Service ---

export const getBlogs = async (): Promise<Blog[]> => {
    const supabase = getClient();
    const { data, error } = await supabase
        .from('Final_blog')
        .select('*')
        .eq('published', true)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(blog => ({
        ...blog,
        image_url: (!blog.image_url ||
            blog.image_url.includes('placeholder') ||
            blog.image_url.includes('placehold.co') ||
            blog.image_url.includes('unsplash.com'))
            ? '/logo.png'
            : blog.image_url
    }));
};

export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
    try {
        const supabase = getClient();
        
        // 1. Primary search
        let { data: blog, error } = await supabase
            .from('Final_blog')
            .select('*')
            .eq('slug', slug)
            .eq('published', true)
            .eq('is_active', true)
            .single();

        // 2. Robust Fallback (Decoded, NFC, NFD)
        if (!blog) {
            try {
                const decodedSlug = decodeURIComponent(slug);
                const candidates = new Set<string>();
                candidates.add(decodedSlug);
                candidates.add(decodedSlug.normalize('NFC'));
                candidates.add(decodedSlug.normalize('NFD'));
                candidates.delete(slug);

                for (const candidate of candidates) {
                    const { data: foundBlog } = await supabase
                        .from('Final_blog')
                        .select('*')
                        .eq('slug', candidate)
                        .eq('published', true)
                        .eq('is_active', true)
                        .single();

                    if (foundBlog) {
                        blog = foundBlog;
                        break;
                    }
                }
            } catch (e) {
                console.warn("[getBlogBySlug] Fallback failed", e);
            }
        }

        if (!blog) return null;

        return {
            ...blog,
            author: {
                name: blog.author_name || "MantraPuja Team",
                avatar: blog.author_avatar || "/logo.png",
                role: blog.author_role || "Editor",
                bio: ""
            }
        };
    } catch (err) {
        console.error('[getBlogBySlug] Critical fetch error:', err);
        return null;
    }
};

export const getPaginatedBlogs = async (
    page: number = 1, 
    limit: number = 12, 
    category?: string, 
    search?: string,
    sort: string = 'newest'
): Promise<{ blogs: Blog[], total: number, error?: boolean }> => {
    try {
        const supabase = getClient();
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        let query = supabase
            .from('Final_blog')
            .select('id, title, blog_title, slug, excerpt, image_url, category, author_name, author_avatar, author_role, created_at, views, is_featured, is_active, published', { count: 'exact' })
            .eq('published', true)
            .eq('is_active', true);

        if (category && category !== 'All') {
            query = query.eq('category', category);
        }

        if (search) {
            query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
        }

        if (sort === 'oldest') {
            query = query.order('created_at', { ascending: true });
        } else if (sort === 'popular') {
            query = query.order('views', { ascending: false });
        } else {
            query = query.order('created_at', { ascending: false });
        }

        const { data, error, count } = await query.range(from, to);

        if (error) {
            console.error('[getPaginatedBlogs] Supabase error:', error);
            return { blogs: [], total: 0, error: true };
        }

        const blogs = (data || []).map(blog => ({
            ...blog,
            image_url: (!blog.image_url ||
                blog.image_url.includes('placeholder') ||
                blog.image_url.includes('placehold.co') ||
                blog.image_url.includes('unsplash.com'))
                ? '/logo.png'
                : blog.image_url
        }));

        return { blogs, total: count || 0, error: false };
    } catch (err) {
        console.error('[getPaginatedBlogs] Critical fetch error:', err);
        return { blogs: [], total: 0, error: true };
    }
};

export const updateBlog = async (id: string, updates: Partial<Blog>): Promise<Blog | null> => {
    const { data, error } = await defaultSupabase
        .from('Final_blog')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// --- Location Service ---

export const getLocations = async (): Promise<Location[]> => {
    const supabase = getClient();
    const { data, error } = await supabase
        .from('locations')
        .select('*')
        .order('name', { ascending: true });

    if (error) throw error;

    // Implementation: Ensure all locations have at least the logo if no images are present
    return (data || []).map(location => ({
        ...location,
        images: (!location.images || location.images.length === 0) ? ['/logo.png'] : location.images
    }));
};

export const updateLocation = async (id: string, updates: Partial<Location>): Promise<Location | null> => {
    const { data, error } = await defaultSupabase
        .from('locations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};
export const getHomeQuickAccess = async (): Promise<any[]> => {
    const supabase = getClient();
    const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'home_quick_access')
        .single();

    const defaults = [
        { name: "Kundali", img: "/features/kundali.png", link: "/kundli", color: "from-orange-500/10 to-red-500/10", border: "#f97316" },
        { name: "Rashifal", img: "/features/rashifal.png", link: "/horoscope", color: "from-amber-500/10 to-orange-500/10", border: "#f59e0b" },
        { name: "Panchang", img: "/features/panchang.png", link: "/panchang", color: "from-yellow-500/10 to-amber-500/10", border: "#eab308" },
        { name: "Calculator", img: "/features/calculator.png", link: "/calculators", color: "from-red-500/10 to-pink-500/10", border: "#ef4444" },
        { name: "Chadava", img: "/features/chadava.png", link: "/chadava", color: "from-purple-500/10 to-indigo-500/10", border: "#a855f7" },
        { name: "Guru Ji AI", img: "/features/guru-ai.png", link: "/chat", color: "from-cyan-500/10 to-blue-500/10", border: "#06b6d4" }
    ];

    if (error || !data) {
        return defaults;
    }
    
    try {
        const parsed = typeof data.value === 'string' ? JSON.parse(data.value) : data.value;
        return (parsed && Array.isArray(parsed) && parsed.length > 0) ? parsed : defaults;
    } catch (e) {
        console.error("Failed to parse home_quick_access:", e);
        return defaults;
    }
};
