
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import AuthorProfileClient from '@/components/authors/AuthorProfileClient';

// Disable caching for real-time updates during development
export const revalidate = 0;

async function getAuthor(slug: string) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Robust lookup: try ID, then try exact name, then try decoded name
    const decodedSlug = decodeURIComponent(slug);
    const searchName = decodedSlug.replace(/-/g, ' ');
    
    let { data: author } = await supabase
        .from('blog_authors')
        .select('*')
        .or(`id.eq."${decodedSlug}",name.ilike."${searchName}"`)
        .maybeSingle();

    // If still not found, try searching all authors and matching by slugified name
    if (!author) {
        const { data: allAuthors } = await supabase.from('blog_authors').select('*');
        if (allAuthors) {
            author = allAuthors.find((a: any) => 
                a.name.toLowerCase().replace(/ /g, '-') === decodedSlug ||
                a.name.toLowerCase().replace(/ /g, '-') === slug
            );
        }
    }

    if (!author) return null;

    // Fetch their blogs
    const { data: blogs } = await supabase
        .from('blogs')
        .select('*, blog_authors(name, avatar)')
        .eq('author_name', author.name)
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(6);

    return {
        ...author,
        blogs: blogs || []
    };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const author = await getAuthor(slug);

    if (!author) {
        notFound();
    }

    return <AuthorProfileClient author={author} />;
}
