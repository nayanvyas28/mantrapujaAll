import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase Admin client (Service Role)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
        auth: {
            persistSession: false
        }
    }
);

export async function GET() {
    try {
        // 1. Fetch categories
        const { data: categories, error: catError } = await supabaseAdmin
            .from('categories')
            .select('*')
            .order('order', { ascending: true });

        if (catError) throw catError;

        // 2. Fetch pages
        const { data: pages, error: pageError } = await supabaseAdmin
            .from('pages')
            .select('*')
            .order('order', { ascending: true });

        if (pageError) throw pageError;

        // 3. Fetch blogs
        const { data: blogs, error: blogError } = await supabaseAdmin
            .from('blogs')
            .select('id, title, slug, published')
            .order('created_at', { ascending: false });

        if (blogError) console.warn("Error fetching blogs:", blogError);

        // --- Build Tree ---
        const structure = [];

        // Identify Overrides for Static Pages

        const homeOverride = pages?.find((p: any) => p.slug === '/' || p.slug === 'home');
        const aboutOverride = pages?.find((p: any) => p.slug === 'about-us');
        const contactOverride = pages?.find((p: any) => p.slug === 'contact-us');

        // A. Static Pages (Merged with Overrides)

        // Home
        if (homeOverride) {
            structure.push({
                id: homeOverride.id,
                type: 'page', // It's now editable!
                name: 'Home (Landing Page)',
                slug: '/',
                data: homeOverride
            });
        } else {
            structure.push({
                id: 'home-static',
                type: 'static',
                name: 'Home (Landing Page)',
                slug: '/',
                data: {}
            });
        }

        // About
        if (aboutOverride) {
            structure.push({
                id: aboutOverride.id,
                type: 'page',
                name: 'About Us',
                slug: '/about-us',
                data: aboutOverride
            });
        } else {
            structure.push({
                id: 'about-static',
                type: 'static',
                name: 'About Us',
                slug: '/about-us',
                data: {}
            });
        }

        // Contact
        if (contactOverride) {
            structure.push({
                id: contactOverride.id,
                type: 'page',
                name: 'Contact Us',
                slug: '/contact-us',
                data: contactOverride
            });
        } else {
            structure.push({
                id: 'contact-static',
                type: 'static',
                name: 'Contact Us',
                slug: '/contact-us',
                data: {}
            });
        }

        // B. Categories & Pages
        const categoryNodes = (categories || []).map((cat: any) => ({
            id: cat.id,
            type: 'category',
            name: cat.name,
            slug: cat.slug,
            data: cat,
            children: (pages || [])
                .filter((p: any) => p.category_id === cat.id)
                .map((p: any) => ({
                    id: p.id,
                    type: 'page',
                    name: p.title,
                    slug: `${cat.slug}/${p.slug}`,
                    data: p
                }))
        }));
        structure.push(...categoryNodes);

        // C. Root Pages (Uncategorized Pages that are NOT overrides)
        // Find pages that are NOT in a category and NOT matched as overrides
        const usedIds = new Set([
            homeOverride?.id,
            aboutOverride?.id,
            contactOverride?.id
        ].filter(Boolean));

        const rootPages = (pages || []).filter((p: any) =>
            !p.category_id && !usedIds.has(p.id)
        );

        if (rootPages.length > 0) {
            // Add them as top-level generic pages
            rootPages.forEach((p: any) => {
                structure.push({
                    id: p.id,
                    type: 'page',
                    name: p.title,
                    slug: `/${p.slug}`,
                    data: p
                });
            });
        }

        // D. Blogs
        if (blogs && blogs.length > 0) {
            structure.push({
                id: 'blog-root',
                type: 'blog_root',
                name: 'Blogs',
                slug: '/blog',
                children: blogs.map((b: any) => ({
                    id: b.id,
                    type: 'blog',
                    name: b.title,
                    slug: `blogs/${b.slug}`,
                    data: b
                }))
            });
        }

        return NextResponse.json(structure);
    } catch (error: any) {
        console.error("Site Structure API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
